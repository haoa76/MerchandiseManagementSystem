import { Modal, Button, Form, Input, message, Select, Radio, InputNumber, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { Uploadnew, Editor } from '../../../components'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';


export default function ModalForm(props) {
    const [form] = Form.useForm();//创建form实例
    const [readonly, setReadonly] = useState(false);
    const [defaultFileListMain, setDefaultFileListMain] = useState([])
    const [defaultFileListMore, setDefaultFileListMore] = useState([])
    const [editMainImage, setEditMainImage] = useState('')
    const [editMoreImage, setEditMoreImage] = useState('')
    const [imgWay, setImgWay] = useState(false)
    useEffect(() => {
        setFormData(props.infoTitle)
    }, [])

    const setFormData = (type) => {
        switch (type) {
            case '新增':
                setReadonly(false);
                setDefaultFileListMain([]);
                setDefaultFileListMore([]);
                setImgWay(false)
                setEditMainImage(null)
                setEditMoreImage(null)
                break;
            case '查看':
                setReadonly(true);
                form.setFieldsValue(props.newData)
                console.log('newdata:', props.newData)
                setDefaultFileListMain([{ status: 'done', uid: 'main', name: '商品主图', url: (props.newData && props.newData.mainPic) ? ('/picture' + props.newData.mainPic) : '' }])
                setDefaultFileListMore(
                    (props.newData && props.newData.morePic)
                        ? props.newData.morePic.split(',').map((item, index) => ({
                            status: 'done',
                            uid: `more-${index}`,
                            name: `商品详情图 ${index + 1}`,
                            url: `/picture${item}`
                        }))
                        : []
                );
                break;
            case '编辑':
                form.setFieldsValue(props.newData)
                setEditMainImage(props.newData.mainPic)
                setEditMoreImage(props.newData.morePic)
                setImgWay(true)
                setDefaultFileListMain([{ status: 'done', uid: 'main', name: '商品主图', url: (props.newData && props.newData.mainPic) ? ('/picture' + props.newData.mainPic) : '' }])
                setDefaultFileListMore(
                    (props.newData && props.newData.morePic)
                        ? props.newData.morePic.split(',').map((item, index) => ({
                            status: 'done',
                            uid: `more-${index}`,
                            name: `商品详情图 ${index + 1}`,
                            url: `/picture${item}`
                        }))
                        : []
                );
                setReadonly(false);
                break;
            default:
                break;
        }
    }
    const handleClose = () => {
        if (typeof props.onClose === 'function') {
            props.onClose();
        }
    };
    const onEditorChange = (value) => {
        form.setFieldsValue({ desc: value })
    }
    const doUploadSaveMain = (value) => {
        form.setFieldsValue({ mainPic: value[0]?.response ? value[0].response.file.url : null })
    }
    const doUploadSaveMore = (value) => {
        console.log('value:', value);
        let moreVal = value.map(item => {
            return item.response ? item.response.file.url : null
        })
        form.setFieldsValue({ morePic: moreVal.join(',') })
    }
    const onSub = async (values) => {
        console.log('values:', values);
        const res = await global.services.post('/loca/loca/product/add', { ...values, attrs: JSON.stringify(values.attrs) })
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
        const res = await global.services.post('/loca/loca/product/edit', { ...values, attrs: JSON.stringify(values.attrs) })
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
                name="productBasic"
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
                <Form.Item label="商品名称" name="name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="所属类型" name="type" rules={[{ required: true }]}>
                    <Select style={{ width: 200 }}>
                        <Select.Option value='0'>图书</Select.Option>
                        <Select.Option value='1'>服装</Select.Option>
                        <Select.Option value='2'>电器</Select.Option>
                        <Select.Option value='3'>家具</Select.Option>
                        <Select.Option value='4'>数码</Select.Option>
                        <Select.Option value='5'>食品</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label='属性' required>
                    <Form.List name='attrs' rules={[{ required: true, message: "请输入属性" }]}>
                        {(fileds, { add, remove }, { errors }) => (
                            <>
                                {fileds.map(({ name }) => (<Space align='baseline'>
                                    <Form.Item name={[name, 'key']} rules={[{ required: true, message: "不能为空" }]}>
                                        <Input placeholder='颜色/大小/版本...' />
                                    </Form.Item>
                                    <Form.Item name={[name, 'value']} rules={[{ required: true, message: "不能为空" }]}>
                                        <Input placeholder='属性名' />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>))}
                                <Form.Item>
                                    <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>添加属性</Button>
                                </Form.Item>
                                <Form.ErrorList errors={errors} />
                            </>
                        )}
                    </Form.List>
                </Form.Item>
                <Form.Item label="商品主图" name="mainPic" >
                    <Uploadnew key={defaultFileListMain.length > 0 ? defaultFileListMain[0].uid : 'empty'} imgWay={imgWay} onChange={doUploadSaveMain} defaultFileList={defaultFileListMain} editImage={editMainImage} />
                </Form.Item>
                <Form.Item label="商品详情图" name="morePic" >
                    <Uploadnew key={defaultFileListMore.length > 0 ? defaultFileListMore[0].uid : 'empty'} maxCount={5} imgWay={imgWay} onChange={doUploadSaveMore} defaultFileList={defaultFileListMore} editImage={editMoreImage} />
                </Form.Item>
                <Form.Item label="上架" name="isOfShelf" rules={[{ required: true }]}>
                    <Radio.Group>
                        <Radio value='1'>是</Radio>
                        <Radio value='0'>否</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="价格" name="price" rules={[{
                    validator: (rule, value) => {
                        if (form.getFieldValue('isOfShelf') === '1' && !value) {
                            return Promise.reject(new Error('请输入价格'));
                        }
                        return Promise.resolve();
                    }
                }]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item label="商品详情" name='descs' rules={[{ required: true }]}>
                    {readonly ? <div dangerouslySetInnerHTML={{ __html: props.newData.descs }}></div> : <Editor onChange={onEditorChange} defaultValue={props.newData ? props.newData.descs : null} />}
                </Form.Item>
                <Form.Item name="id" hidden={true}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>

    )
}
