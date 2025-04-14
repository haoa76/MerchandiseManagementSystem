import { Modal, Table, Button, message } from 'antd';
import React, { useEffect, useState } from 'react';

export default function RelateModalForm(props) {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {
        props.onGetRelateList();
        if (props.newData && props.newData.relateMenu) {
            setSelectedRowKeys(
                props.newData.relateMenu.split(',').map(item => Number(item))
            );
        } else {
            setSelectedRowKeys([]); 
        }
    }, [props.newData]);

    const handleClose = () => {
        props.onClose();
    };

    const onSubmit = async () => {
        const res = await global.services.post('/loca/loca/user/relate', {
            id: props.newData.id,
            relateMenu: selectedRowKeys.join(',')
        });
        if (res.code === '00000') {
            message.success(res.message);
        } else if (res.code === '-1') {
            message.error(res.message);
        } else {
            message.error('请求出错');
        }
        props.onClose();
        props.onGetList();
    };

    // 行选择配置
    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedKeys) => {
            setSelectedRowKeys(newSelectedKeys);
            console.log('当前选中:', newSelectedKeys);
        },
        checkStrictly: false
    };

    const columns = [
        {
            title: '菜单',
            dataIndex: 'name',
        },
        {
            title: '访问地址',
            dataIndex: 'linkUrl',
        }
    ];

    return (
        <Modal
            key={props.newData.id}
            title={props.infoTitle}
            visible={props.visible}
            onCancel={handleClose}
            footer={[
                <Button key="close" onClick={handleClose}>
                    关闭
                </Button>,
                <Button type="primary" htmlType="submit" onClick={onSubmit}>
                    提交
                </Button>
            ]}
        >
            <Table
                columns={columns}
                dataSource={props.relateDataSou}
                rowSelection={rowSelection}
            />
        </Modal>
    );
}