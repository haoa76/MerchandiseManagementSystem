import { Modal, Button, Form, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { AreaCascader } from '../../../components';
// import { Upload } from '../../../components'
import { Uploadnew } from '../../../components'
import { values } from 'lodash';


export default function ModalForm(props) {
    const [form] = Form.useForm();//创建form实例
    const [readonly, setReadonly] = useState(false);
    const [areaVal, setAreaVal] = useState([])
    const [defaultFileList, setDefaultFileList] = useState([])
    const [editImage, setEditImage]=useState('')
    const [imgWay,setImgWay]=useState(false)
    useEffect(() => {
        setFormData(props.infoTitle)
    }, [])
    // useEffect(() => {
    //     console.log('Updated defaultFileList:', defaultFileList);
    // }, [defaultFileList]);
    // useEffect(() => {
    //     console.log('Updated areaVal:', areaVal);
    // }, [areaVal]);


    // const getDefaultArea=async ()=>{
    //     const province=await global.services.()
    // }

    const setFormData = (type) => {
        switch (type) {
            case '新增':
                setReadonly(false);
                setEditImage(null);
                setDefaultFileList([]);
                setImgWay(false)
                setAreaVal([])
                break;
            case '查看':
                setReadonly(true);
                form.setFieldsValue(props.newData)
                console.log('newdata:', props.newData)
                setAreaVal(props.newData.area.split(','))
                setDefaultFileList([{ status: 'done', uid: 'default', name: 'default.jpg', url: (props.newData && props.newData.picture) ? ('/picture' + props.newData.picture) : '' }])
                break;
            case '编辑':
                form.setFieldsValue(props.newData)
                setEditImage(props.newData.picture)
                setImgWay(true)
                setAreaVal(props.newData.area.split(','))
                setDefaultFileList([{ status: 'done', uid: 'default', name: 'default.jpg', url: (props.newData && props.newData.picture) ? ('/picture' + props.newData.picture) : '' }])
                setReadonly(false);
                break;
            default:
                break;
        }
    }
    const handleClose = () => {
        // 触发父组件状态更新
        if (typeof props.onClose === 'function') {
            props.onClose();
        }
    };
    const handleAreaClick = (item) => {
        console.log(item);
        form.setFieldsValue({ area: item })
    };
    const doUploadSave = (value) => {
        form.setFieldsValue({ picture: value[0]?.response ? value[0].response.file.url : null })
    }
    const onSub = async (values) => {
        const res = await global.services.post('/loca/loca/user/add', { ...values, area: values.area.join(',') })
        // debugger
        if (res.code === '00000') {
            message.success(res.message)
            props.onGetList()
            handleClose()
        } else if (res.code === '-1') {
            message.error(res.message)
        } else {
            message.error('请求出错')
        }
    }
    const onEdit = async (values) => {
        console.log('Sm:', values);
        const res = await global.services.post('/loca/loca/user/edit', { ...values, area: Array.isArray(values.area)?values.area.join(','):values.area,id:props.newData.id})
        if (res.code === '00000') {
            message.success(res.message)
            props.onGetList()
            handleClose()
        } else if (res.code === '-1') {
            message.error(res.message)
        } else {
            message.error('请求出错')
        }
    }
    const onFinish = (values) => {
        console.log('Success:', values);
        if (props.infoTitle == '新增') {
            onSub(values)
        } else if (props.infoTitle == '编辑') {
            onEdit(values)
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            className={readonly ? 'modal-form' : ''}
            title={props.infoTitle}
            visible={props.visible}
            onCancel={handleClose}
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
                name="userBasic"
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
                <Form.Item label="用户名" name="name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="账号" name="account" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="所在地区" name="area" rules={[{ required: true }]}>
                    <AreaCascader key={areaVal.length > 0 ? areaVal.join(',') : 'empty'} onChange={handleAreaClick} defaultValue={areaVal} />
                </Form.Item>
                <Form.Item label="联系方式" name="tel" rules={[{ required: true }, { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="邮箱" name="email" rules={[{ required: true }, { type: 'email', message: '请输入正确的邮箱' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="上传头像" name="picture" >
                    {/* <Upload /> */}
                    <Uploadnew key={defaultFileList.length > 0 ? defaultFileList[0].uid : 'empty'} imgWay={imgWay} onChange={doUploadSave} defaultFileList={defaultFileList} editImage={editImage} />
                    {/* 这个key十分必要,否则子组件将不会随defaultFileList变化而更新 */}
                </Form.Item>
            </Form>
        </Modal>

    )
}
