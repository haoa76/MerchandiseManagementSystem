import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/index';
import 'antd/dist/antd.css'
import './Home.scss'
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider, message } from 'antd';
import services from './services';

global.services = services;//将services（封装的网络请求函数）挂载到全局，方便调用，给全局变量global
window.addEventListener('unhandledrejection', e => {
  const { response = {}, reason = {} } = e;
  const { code } = reason
  if (code === '102') {
    window.location = '/login'
    return
  }
  message.error(response.data || reason.message || '未知错误')
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
