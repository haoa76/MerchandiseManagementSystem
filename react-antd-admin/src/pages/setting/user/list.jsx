import { Avatar, Pagination, Space, Table } from 'antd';
import React from 'react'

export default function list(props) {
   
    const pagination={
        ...props.pagination,
        showTotal:(total)=>{
            return `共${total}条`
        }
    }
    const onChange=(pagination)=>{
        props.onGetList({...pagination,...props.filter})
    }

    const columns = [
        {
            title: '用户名',
            dataIndex: 'name',
            render:(text,record) => (
                <Space>
                    <Avatar src={'/picture'+record.picture} />
                    {text}
                </Space>
            )
        },
        {
            title: '账号',
            dataIndex: 'account',
        },
        {
            title: '联系方式',
            dataIndex: 'tel',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            title: '操作',
            render: (record) => {
                return <Space>
                    <a onClick={props.onView(record)}>查看</a>
                    <a onClick={props.onEdit(record)}>编辑</a>
                    <a onClick={props.onDelete(record)}>删除</a>
                    <a onClick={props.onRelate(record)}>关联菜单</a>
                </Space>
            }
        },
    ];

    return (
        <Table columns={columns} dataSource={props.dataSou} pagination={pagination} onChange={onChange}/>
    )
}
