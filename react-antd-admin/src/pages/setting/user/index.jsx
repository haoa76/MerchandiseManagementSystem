import React, { use, useState, useEffect } from 'react'
import { Panel } from '../../../components'
import { Card, Button, Form, Input, Modal, message } from 'antd'
import List from './list'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import ModalForm from './modalForm'
import RelateModalForm from './relateModalForm'
export default function Index() {
    const [collapsed2, setCollapsed2] = useState(false)
    const [newData, setNewData] = useState(null);
    const [infoTitle, setInfoTitle] = useState('')
    const [dataSou, setDataSou] = useState([]);
    const [relateDataSou, setRelateDataSou] = useState([]);
    const [collapsedRelate, setCollapsedRelate] = useState(false);

    const [pagination, setPagination] = useState({})
    const [filter, setFilter] = useState({});

    const onSearch = (values) => {
        // console.log(values)
        setFilter(values)
        onGetList(values)
    }
    const onGetList = async (params = {}) => {
        try {
            const res = await global.services.get('/loca/loca/user/list', params);
            console.log(res);
            setPagination(res.pagination)
            setDataSou(res.records.map(item => {
                if (item.children && item.children.length > 0) {
                    item.children = item.children.map(citem => {
                        return { ...citem, key: citem.id }
                    })
                }
                return { ...item, key: item.id }
            }
            ));
        } catch (error) {
            console.error('请求失败:', error);
        }
    };

    const onGetRelateList = async (params = {}) => {
        try {
            const res = await global.services.get('/loca/loca/user/relateMenu', params);
            console.log(res);
            setRelateDataSou(res.records.map(item => {
                if (item.children && item.children.length > 0) {
                    item.children = item.children.map(citem => {
                        return { ...citem, key: citem.id }
                    })
                }
                return { ...item, key: item.id }
            }
            ));
        } catch (error) {
            console.error('请求失败:', error);
        }
    }
    const onAdd = (record) => {
        return () => {
            setNewData(record);
            setInfoTitle('新增')
            setCollapsed2(true)
        }
    }

    const onView = (record) => {
        return () => {
            setNewData(record);
            setInfoTitle('查看')
            setCollapsed2(true)
        }
    }
    const onEdit = (record) => {
        return () => {
            setNewData(record);
            setInfoTitle('编辑')
            setCollapsed2(true)
        }
    }

    const onRelate = (record) => {
        return () => {
            setNewData(record);
            setInfoTitle('关联')
            setCollapsedRelate(true)
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
                        const res = await global.services.post('/loca/loca/user/delete', { id: record.id });
                        if (res.code === '00000') {
                            message.success('删除成功');
                            onGetList();
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
    const onChange = (e) => {
        if (e.target.value === '') {
            setFilter({});
            onGetList();
        }
    }
    useEffect(() => {
        onGetList();
    }, []);
    return (
        <Panel title='用户管理'>
            <Card className='m-filter'>
                <Form layout='inline' onFinish={onSearch}>
                    <Form.Item label='用户名' name='name'>
                        <Input onChange={onChange} />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>搜索</Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card>
                <div className='m-operate'>
                    <Button type="primary" icon={<PlusOutlined />} onClick={onAdd()}>新增</Button>
                </div>
                <List dataSou={dataSou} pagination={pagination} onGetList={onGetList} filter={filter} onRelate={onRelate} onEdit={onEdit} onView={onView} onDelete={onDelete} />
            </Card>
            {collapsed2 && <ModalForm newData={newData} visible={collapsed2} infoTitle={infoTitle} onClose={() => { setCollapsed2(false) }} onGetList={onGetList} />}
            {collapsedRelate && <RelateModalForm relateDataSou={relateDataSou} newData={newData} visible={collapsedRelate} infoTitle={infoTitle} onClose={() => { setCollapsedRelate(false) }} onGetRelateList={onGetRelateList} onGetList={onGetList} />}
        </Panel>
    )
}
