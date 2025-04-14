import { Menu, message} from 'antd';
import React,{useEffect}from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  Link } from 'react-router-dom';
import { setDataSource } from '../../store/reducers/dataSourceSlice';
import { allIcons } from '../../components';
//自定义菜单项生成函数
// console.log(allIcons)

// 辅助函数：根据icon名称获取对应的icon组件
const getIconComponent = (iconName) => {
  const icon = allIcons.find(iconItem => iconItem.key === iconName);
  return icon ? icon.icon : null;
};
function getItem(label='', key=-1, icon=null, children = null, type='', linkUrl='/404') {

  //写的一个函数，用于匹配icon的值和allIcons的key值，返回allIcons 的icon
  const iconComponent = getIconComponent(icon);
    return {
      key,
      icon:iconComponent,
      children: children?children.map(child => getItem(child.name, child.id, child.icon, child.children, child.openType, child.linkUrl)):null,
      label:(
        type==='1'?<Link style={{ color: '#1890ff', fontWeight: 500 ,fontSize: '14px'}} to={linkUrl}>
          {label}
        </Link>:<a style={{ color: '#1890ff', fontWeight: 500 ,fontSize: '14px'}} onClick={() => {window.open(linkUrl)}}>{label}</a>
      ),
      type,
      linkUrl
    };
  }
const SlideMenu = () => {
  const dataSource = useSelector(state => state.dataSource.dataSource);
  // const account = useSelector(state => state.userInfo.userInfo);
  const dispatch = useDispatch();
  //获取列表值
    const onGetList = async () => {
      try {
        const res = await global.services.get('/loca/loca/main/list');
        if(res.message){
          message.error(res.message)
        }
        console.log(res.record);
        dispatch(setDataSource(res.record.map(item => ({ ...item, key: item.id }))));
      } catch (error) {
        console.error('请求失败:', error);
      }
    };
    //where,刷新
  
    useEffect(() => {
      onGetList();
    }, []);

  return (
    <Menu
      style={{
        width: 256,
        height: '100%',
        borderRight: 0
      }}
      mode="inline"
      // defaultOpenKeys={dataSource[0]?dataSource[0].id:[]}
      // defaultSelectedKeys={dataSource[0]?(dataSource[0].children?dataSource[0].children[0].id:[]):[]}
      items={dataSource.map(item => getItem(item.name, item.id, item.icon, item.children, item.openType, item.linkUrl))}
    />
  );
};

export default SlideMenu;