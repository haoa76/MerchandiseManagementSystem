import React, { useState, useEffect } from 'react'
import { Cascader } from 'antd'


export default function Index(props) {
    const [options, setOptions] = useState([])
    const onGetPrivince = async () => {
        const res = await global.services.get('/loca/loca/area/province')
        res.records.map(item => {
            item.isLeaf = false
            item.value = item.province_name
            item.label = item.province_name 
        })
        setOptions(res.records)
    }
    useEffect(() => {
        onGetPrivince()
    }, [])
    //动态加载市/区
    const onGetCityorDistrict = async (parent) => {
        const isLeaf = parent.children_has_children === 1 ? false : true
        const res = await global.services.get(`/loca/loca/area/${isLeaf ? 'district' : 'city'}`, { pid: parent.id })
        res.records.map(item => {
                item.isLeaf = isLeaf
            if (isLeaf) {
                item.value = item.district_name
                item.label = item.district_name
            } else {
                item.value = item.city_name
                item.label = item.city_name
            }
        })
        // console.log(res.records)
            parent.children = res.records
        setOptions([...options])
    }

    const loadData = (selectedOptions = []) => {
        //console.log(selectedOptions)
        const targetOption = selectedOptions[selectedOptions.length - 1];
        onGetCityorDistrict(targetOption)
    }
    return (
        <Cascader placeholder="省/市/区"
            options={options}
            loadData={loadData}
            onChange={props.onChange}
            defaultValue={props.defaultValue}
        />
    )
}
