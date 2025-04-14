import React, { useEffect, useState } from 'react'
import { Space,message } from "antd"
import "./header.scss"
import { jwtDecode } from "jwt-decode"


export default function Index() {


  const [account, setAccount] = useState('')
  const [nameOfInfo, setNameOfInfo] = useState('')

  const onGetName = (account) => {
    if (account) {
      global.services.post('/loca/loca/getInfo/getUserInfo', { account }).then(res => {
        if (res.code === '00000') {
          setNameOfInfo(res.data[0].name)
        } else if (res.code === '-1') {
          message.error(res.message)
        }
        else {
          message.error('请求出错')
        }
      })
    }
    return nameOfInfo
  }
  const onLogon = () => {
    window.location = '/'
    sessionStorage.removeItem('token')
  }
  const onGetAccount = () => {
    setAccount(sessionStorage.token ? jwtDecode(sessionStorage.token).account : '')
  }
  useEffect(() => {
    onGetAccount()
  }, [])
  return (
    <div className='header'>
      <Space>
        <span>hi, {onGetName(account)}</span>
        <a onClick={onLogon}>退出登录</a>
      </Space>
    </div>
  )
}
