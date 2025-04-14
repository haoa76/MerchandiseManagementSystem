import * as icons from '@ant-design/icons'
import _ from 'lodash'
import React from 'react';

const allIcons = [];
_.forEach(icons, (value, key) => {
    //object必须小写
    if(typeof value==='object'&&key!=='default'&&key!=='IconProvider'){
        allIcons.push({
            key: key,
            label: key,
            value:value,
            icon:React.createElement(value)
        })
    } 
})
export default allIcons
