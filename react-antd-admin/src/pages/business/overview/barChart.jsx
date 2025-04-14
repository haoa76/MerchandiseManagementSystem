import React, { useEffect } from 'react'
import * as echarts from 'echarts'

export default function TopChart(props) {
    const ref = React.useRef()
    useEffect(() => {
        const echart = echarts.init(ref.current)
        const option = {
            tooltip: {
                show: true,
            },
            grid: {
                left: 10,
                bottom: 10,
                top: 10,
                containLabel: true
            },
            yAxis: {
                
            },
            xAxis: {
                type: 'category',
            },
            series: [
                {
                    name: '销售额',
                    type: 'bar',
                    itemStyle: {
                        color: '#73c0de'
                    },
                
                }
            ]
        }
        echart.setOption(option)
        //监听浏览器窗口大小变化，从而改变图表大小
        window.addEventListener('resize', () => {
            echart.resize()
        })
        global.services.get('/loca/loca/overview/volumetop10').then(res => {
            echart.setOption({
                dataset: { source: res.records }
            })
        })
    }, [])
    return (
        <div ref={ref} style={{ height: '100%' }}>

        </div>
    )
}

