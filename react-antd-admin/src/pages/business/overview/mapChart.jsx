import React, { useEffect } from 'react'
import * as echarts from 'echarts'
import chinaJson from '../../../assets/geoJson/china.json'
import { inRange } from 'lodash'

export default function MapChart(props) {
    const ref = React.useRef()
    useEffect(() => {
        echarts.registerMap('china', chinaJson) //注册中国地图
        const echart = echarts.init(ref.current)
        const option = {
            //视觉映射
            visualMap: {
                show: true,
                min: 1000,
                max: 10000,
                inRange: {
                    color: ['#ffd768', '#7f1100'],
                    symbolSize: [8, 16],
                },
                outOfRange: {
                    color: 'red',
                }
            },
            //设置地理坐标系
            geo: {
                map: 'china',
                zoom: 1.6,
                show: true,
                top: 100,
                itemStyle: {
                    areaColor: '#84bada',
                    borderColor: '#fff',
                    borderWidth: 0.5,
                },
                emphasis: {
                    itemStyle: {
                        areaColor: '#84bada',
                        opacity: 0.6,

                    },
                },
            },
            tooltip: {
                show: true,
            },
            series: [
                {
                    type: 'scatter',
                    coordinateSystem: 'geo', //设置坐标系为地理坐标系
                    encode: {
                        // 数据到视觉的映射
                        lng: 'lng', //经度
                        lat: 'lat', //纬度
                        tooltip: ['name', 'value']
                    },
                }
            ]
        }
        echart.setOption(option)
        //监听浏览器窗口大小变化，从而改变图表大小
        window.addEventListener('resize', () => {
            echart.resize()
        })
        global.services.get('/loca/loca/overview/mapsales').then(res => {
            echart.setOption({
                dataset: {
                    // 定义维度
                    dimension: ['name', 'value', 'lng', 'lat'],
                    source: res.records
                }
            })
        })
    }, [])
    return (
        <div ref={ref} style={{ height: '100%' }}>

        </div>
    )
}
