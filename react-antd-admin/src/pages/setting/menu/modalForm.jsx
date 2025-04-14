import React from 'react';
import { Modal, Button, Form, Input, Select, Radio, Dropdown, Pagination, message } from 'antd';
import { useState, useEffect } from 'react';
import { allIcons } from '../../../components';
import _ from 'lodash';
// import axios from 'axios';
// import * as icons from '@ant-design/icons'


// 辅助函数：根据icon名称获取对应的icon组件
const getIconComponent = (iconName) => {
  const icon = allIcons.find(iconItem => iconItem.key === iconName);
  return icon ? icon.icon : null;
};

export default function ModalForm(props) {
  const [form] = Form.useForm();//创建form实例
  // console.log(form)


  //创建下拉菜单元素
  // console.log(allIcons);
  const [finalIcons, setFinalIcons] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);

  //设置下拉菜单点击显示
  const [appearIcons, setAppearIcons] = useState('');
  const [beforeIcon, setBeforeIcon] = useState(null);
  const handleIconClick = (item) => {
    setAppearIcons(item.label);
    setBeforeIcon(item.icon);
    form.setFieldsValue({ icon: item.key })
  }
  const [readonly, setReadonly] = useState(false);
  const [pName, setpName] = useState('无');
  const [iconComponent, setIconComponent] = useState(null);
  const getFetchPName = async () => {
    try {
      if (props.newData.pid !== -1) {
        const res = await global.services.get('/loca/loca/menu/getpName', { id: props.newData.pid })
        setpName(res.record.name);
        return
      }
    } catch (error) {
      console.error('请求失败:', error);
    }
    setpName('无');
    return
  }
  //根据类型设置form表单数据函数
  const setFormData = (type) => {
    switch (type) {
      case '新增':
        setReadonly(false);
        setpName(props.newData ? props.newData.name : "无");
        break;
      case '查看':
        form.setFieldsValue(props.newData)
        setAppearIcons(props.newData.icon);
        setIconComponent(getIconComponent(props.newData.icon));
        setBeforeIcon(iconComponent);
        setReadonly(true);
        getFetchPName();
        break;
      case '编辑':
        form.setFieldsValue(props.newData)
        setAppearIcons(props.newData.icon);
        setIconComponent(getIconComponent(props.newData.icon));
        setBeforeIcon(iconComponent);
        setReadonly(false);
        getFetchPName();
        break;
      default:
        break;
    }
  }


  useEffect(() => {
    setFinalIcons(allIcons);
    setCurrentPage(allIcons.slice(0, 10));
    setFormData(props.infoTitle);
  }, []);
  useEffect(() => {
    setBeforeIcon(iconComponent);
  }, [iconComponent])

  const changeSelectedIcons = (e) => {
    let val = e.target.value;
    val = _.trim(val);
    setAppearIcons(val);
    let newItems = [];
    if (val) {
      // 对数据进行遍历，判断是否包含输入的关键字
      finalIcons.map(items => {
        if (_.lowerCase(items.label).indexOf(_.lowerCase(val)) !== -1) {
          newItems.push(items);
        }
      })
      setFinalIcons(newItems);
      setCurrentPage(newItems.slice(0, 10));
      return;
    }
    setFinalIcons(allIcons);
    setCurrentPage(allIcons.slice(0, 10));

  };

  //设置分页器控制
  // 统一关闭操作处理
  const handleClose = () => {
    // 触发父组件状态更新
    if (typeof props.onClose === 'function') {
      props.onClose();
    }
  };

  // 单选框radios设置
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    // console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  const onFinish = (values) => {
    console.log('Success:', values);
    if (props.infoTitle == '新增') {
      let pid = props.newData ? props.newData.id : undefined;
      global.services.post('/loca/loca/menu/add', { ...values, pid: pid }).then(res => {     //这里以loca开头访问代理服务器，另一个/loca替换/api
        console.log(res);
      })
      message.success('添加成功');
    } else if (props.infoTitle == '编辑') {
      global.services.post('/loca/loca/menu/edit', { ...values, id: props.newData.id }).then(res => {
        console.log(res);
      })
      message.success('更改成功');
    }
    props.onGetList();
    handleClose(); // 提交成功后关闭模态框
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title={props.infoTitle}
      visible={props.visible}
      onCancel={handleClose}         // 点击右上角叉号时触发
      className={readonly ? 'modal-form' : ''}
      footer={[
        <Button
          key="close"
          onClick={handleClose}      // 按钮点击触发
        >
          关闭
        </Button>,
        <Button type="primary" htmlType="submit" onClick={() => form.submit()}>
          提交
        </Button>
      ]}
    >
      <Form
        name="menuBasic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form} // 添加 form 控制实例
      >
        <Form.Item
          label="父菜单"
        >
          {pName}
        </Form.Item>
        <Form.Item
          label="菜单名称"
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="访问路径"
          name="linkUrl"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="打开方式"
          name="openType"
          initialValue="1"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              {
                value: '1',
                label: '当前窗口',
                key: 1
              },
              {
                value: '2',
                label: '新窗口',
                key: 2
              }
            ]}
          />
        </Form.Item>
        <Form.Item
          label="图标"
          name="icon"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Dropdown menu={{
            items: currentPage.map(item => ({
              ...item,
              onClick: () => handleIconClick(item),
            }))
          }} dropdownRender={(menu) => (
            <div style={{ width: 440, height: 400 }}>
              {menu}
              <div style={{
                paddingTop: 8,
                paddingBottom: 8,
                // paddingLeft: 16,
                // paddingRight: 16,
                borderTop: '1px solid #f0f0f0',
                textAlign: 'center',
                backgroundColor: '#fff'
              }}>
                <Pagination onMouseDown={e => e.stopPropagation()} // 阻止点击分页时关闭下拉
                  onChange={(page, pageSize) => { setCurrentPage(finalIcons.slice((page - 1) * pageSize, page * pageSize)) }}
                  showSizeChanger={false}  //去除单页页数选择
                  total={finalIcons.length} />
              </div>
            </div>
          )}>
            <a onClick={(e) => e.preventDefault()}>
              <Input placeholder='请选择图标' onChange={changeSelectedIcons} value={appearIcons} addonBefore={beforeIcon} />
              {/* <Pagination onChange={(page, pageSize) => { setCurrentPage(finalIcons.slice((page - 1) * pageSize, page * pageSize)) }} total={finalIcons.length} /> */}
            </a>
          </Dropdown>
        </Form.Item>
        <Form.Item
          label="权限"
          name="isOfAdmin"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>仅超管可见</Radio>
            <Radio value={2}>不限</Radio>
          </Radio.Group>
        </Form.Item>


      </Form>
    </Modal>
  );
}