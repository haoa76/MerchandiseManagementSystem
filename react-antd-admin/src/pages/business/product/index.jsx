import React, { useState, useEffect } from 'react'
import { Panel } from '../../../components'
import { Card, Button, Form, Input, Modal, message, Select, List, Avatar, Space } from 'antd'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import ModalForm from './modalForm'
export default function Index() {
    const [collapsed2, setCollapsed2] = useState(false)
    const [newData, setNewData] = useState(null);
    const [infoTitle, setInfoTitle] = useState('')
    const [dataSou, setDataSou] = useState([]);

    const [pagination, setPagination] = useState({})
    const [filter, setFilter] = useState({});

    const onSearch = (values) => {
        // console.log(values)
        setFilter(values)
        onGetList(values)
    }
    const onGetList = async (params = {}) => {
        try {
            const res = await global.services.get('/loca/loca/product/list', params);
            console.log(res);
            setPagination(res.pagination)
            setDataSou(res.records.map(item => {
                return { ...item, key: item.id }
            }
            ));
        } catch (error) {
            console.error('请求失败:', error);
        }
    };


    const onAdd = (record) => {
        return () => {
            setNewData(record);
            setInfoTitle('新增')
            setCollapsed2(true)
        }
    }

    const onView = (record) => {
        return () => {
            console.log('view:',record);
            setNewData({...record,attrs:JSON.parse(record.attrs)});
            setInfoTitle('查看')
            setCollapsed2(true)
        }
    }
    const onEdit = (record) => {
        return () => {
            setNewData({...record,attrs:JSON.parse(record.attrs)});
            setInfoTitle('编辑')
            setCollapsed2(true)
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
                        const res = await global.services.post('/loca/loca/product/delete', { id: record.id });
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
        <Panel title='商品管理'>
            <Card className='m-filter'>
                <Form layout='inline' onFinish={onSearch}>
                    <Form.Item label='商品名称' name='name'>
                        <Input onChange={onChange} />
                    </Form.Item>
                    <Form.Item label='商品类型' name='type'>
                        <Select style={{ width: 200 }} allowClear>
                            <Select.Option value='0'>图书</Select.Option>
                            <Select.Option value='1'>服装</Select.Option>
                            <Select.Option value='2'>电器</Select.Option>
                            <Select.Option value='3'>家具</Select.Option>
                            <Select.Option value='4'>数码</Select.Option>
                            <Select.Option value='5'>食品</Select.Option>
                        </Select>
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
                <List
                    dataSource={dataSou}
                    pagination={{
                        ...pagination,
                        showTotal: (total) => {
                            return `共${total}条`
                        },
                        onChange: (current) => {
                            onGetList({ ...filter, current });
                        }
                    }}
                    renderItem={(item) => (
                        <List.Item actions={[
                            <a onClick={onView(item)}>查看</a>,
                            <a onClick={onEdit(item)}>编辑</a>,
                            <a onClick={onDelete(item)}>删除</a>
                        ]}>
                            <List.Item.Meta
                                avatar={<Avatar src={'/picture' + item.mainPic} />}
                                title={item.name}
                                description={['图书', '服装', '电器', '家具', '数码', '食品'][item.type]}
                            />
                            <Space>
                                {item.price ? <span style={{ color: 'red' }}>{`￥${item.price}`}</span> : null}
                                <span>{JSON.parse(item.attrs).map(attr => (attr.key + ':' + attr.value + ';'))}</span>
                            </Space>
                        </List.Item>
                    )}
                >
                </List>
                {/* <List dataSou={dataSou} pagination={pagination} onGetList={onGetList} filter={filter} onRelate={onRelate} onEdit={onEdit} onView={onView} onDelete={onDelete} /> */}
            </Card>
            {collapsed2 && <ModalForm newData={newData} visible={collapsed2} infoTitle={infoTitle} onClose={() => { setCollapsed2(false) }} onGetList={onGetList} />}
        </Panel>
    )
}
