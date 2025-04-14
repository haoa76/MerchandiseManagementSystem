import React,{ useState } from 'react'
import { Form, Input, Button } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import './style/index.scss'
import CryptoJs from 'crypto-js'
import { message } from 'antd'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUserInfo } from '../../store/reducers/userInfoSlice'
export default function Index() {
    const [loginTo,setLoginTo]=useState(false)
    const dispatch = useDispatch()
    const onLogin = (values) => {
        console.log(values)
        global.services.post('/loca/loca/login/login', { ...values, password: CryptoJs.AES.encrypt(values.password, '12345678').toString() }).then(res => {
            if (res.code === '00000') {
                message.success(res.message)
                // dispatch(setUserInfo(values.account))
                sessionStorage.setItem('token', res.token)
                setLoginTo(true)
            } else if (res.code === '-1') {
                message.error(res.message)
            }else {
                message.error('请求出错')
            }
        })
    }
    return (
        <div className="m-login">
            <Form onFinish={onLogin}>
                <h4>登录</h4>
                <Form.Item name='account' rules={[{ required: true, message: '请输入账号' }]}>
                    <Input prefix={<UserOutlined />} placeholder='请输入账号' />
                </Form.Item>
                <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
                    <Input prefix={<LockOutlined />} placeholder='请输入密码' />
                </Form.Item>
                <Form.Item >
                    <Button type='primary' block htmlType='submit'>登录</Button>
                </Form.Item>
            </Form>
            {loginTo && <Navigate to='/'/>}
        </div>
    )
}
