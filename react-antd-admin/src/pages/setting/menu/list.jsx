import { Space, Table } from 'antd';
// import React, { useEffect, useState } from 'react';

export default function List(props) {
    // console.log(props.dataSource)

    //用hook创建状态数据
    // const [dataSource, setDataSource] = useState(
    //     [
    //         {
    //             key: '1',
    //             name: '菜单1',
    //             linkUrl: 'http://www.baidu.com',
    //         },
    //         {
    //             key: '2',
    //             name: '菜单2',
    //             linkUrl: 'http://www.baidu.com',
    //         },
    //         {
    //             key: '3',
    //             name: '菜单3',
    //             linkUrl: 'http://www.baidu.com',
    //         }
    //     ]
    // )
    const columns = [
        {
            title: '菜单',
            dataIndex: 'name',
        },
        {
            title: '访问地址',
            dataIndex: 'linkUrl',
            width: '20%',
        },
        {
            title: '操作',
            width: '40%',
            render: (record) => (
                <Space>
                    <a onClick={props.onView(record)}>查看</a>
                    <a onClick={props.onEdit(record)}>编辑</a>
                    <a onClick={props.onDelete(record)}>删除</a>
                    <a onClick={props.onAdd(record)}>新增</a>
                </Space>
            )
        },
    ];

    return (
        <Table columns={columns} dataSource={props.dataSource} />
    )
}
