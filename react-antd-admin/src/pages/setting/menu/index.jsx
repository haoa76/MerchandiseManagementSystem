import React from 'react'
// import { useEffect } from 'react'
import { Panel } from '../../../components'
import { Card, Button, Modal, message } from 'antd'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import List from './list'
import { useSelector, useDispatch } from 'react-redux'
import { setCollapsed } from '../../../store/reducers/addSlice'
import { setDataSource } from '../../../store/reducers/dataSourceSlice'
import ModalForm from './modalForm'
import { useEffect, useState } from 'react'
// import { set } from 'lodash'
export default function Index() {
  const collapsed = useSelector(state => state.add.collapsed)
  const dispatch = useDispatch()
  // const [dataSource, setDataSource] = useState([]);
  const dataSource = useSelector(state => state.dataSource.dataSource);
  //获取列表值
  const onGetList = async () => {
    try {
      const res = await global.services.get('/loca/loca/menu/list');
      // res.data.record.map(items=>({
      // }))
      console.log(res.record);
      dispatch(setDataSource(res.record.map(item => ({ ...item, key: item.id }))));
    } catch (error) {
      console.error('请求失败:', error);
    }
  };

  useEffect(() => {
    onGetList();
  }, []);

  const [newData, setNewData] = useState(null);
  const [infoTitle, setInfoTitle] = useState('')
  const onAdd = (record) => {
    return () => {
      setNewData(record);
      setInfoTitle('新增')
      dispatch(setCollapsed(true))
    }
  }

  const onView = (record) => {
    return () => {
      setNewData(record);
      setInfoTitle('查看')
      dispatch(setCollapsed(true))
    }
  }

  const onEdit = (record) => {
    return () => {
      setNewData(record);
      setInfoTitle('编辑')
      dispatch(setCollapsed(true))
    }
  }

  const onDelete = (record) => {
    return () => {
      Modal.confirm({
        title: 'Confirm',
        icon: <ExclamationCircleOutlined />,
        content: '确定要删除吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
          try {
            const res = await global.services.post('/loca/loca/menu/delete', { id: record.id });
            if (res.code === '00000') {
              message.success('删除成功');
              onGetList();
            } else if (res.code === '-1') {
              message.error(res.message);
            } else {
              message.error('请求出错');
            }
          } catch (error) {
            console.error('请求失败:', error);
          }
        },
        onCancel: () => { }
      });
    }
  }

  return (
    <Panel title="菜单管理">
      <div className='m-operate'>
        <Button type="primary" icon={<PlusOutlined />} onClick={onAdd()}>新增</Button>
      </div>
      <Card>
        {/* 列表组件 */}
        <List dataSource={dataSource} onAdd={onAdd} onView={onView} onEdit={onEdit} onDelete={onDelete} />
      </Card>
      {collapsed && <ModalForm newData={newData} visible={collapsed} infoTitle={infoTitle} onClose={() => dispatch(setCollapsed(false))} onGetList={onGetList} />}
      {/* 这里一定通过dispatch() 调用setCollapsed() */}
    </Panel>
  )
}
