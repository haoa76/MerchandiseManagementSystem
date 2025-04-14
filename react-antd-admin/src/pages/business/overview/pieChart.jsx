import React, { useEffect } from 'react'
import * as echarts from 'echarts'

export default function PieChart(props) {
    const ref = React.useRef()
    useEffect(() => {
        const echart = echarts.init(ref.current)
        const option = {
            tooltip: {
                show: true,
            },
            series: [
                {
                    type: 'pie',
                    radius: '50%',
                    label: {
                        formatter: '{b}: {d}%' //b:数据名，d:数据值
                    },
                    data: [
                        { name: 'A', value: 40 },
                        { name: 'B', value: 30 },
                        { name: 'C', value: 20 },
                        { name: 'D', value: 10 }
                    ]
                }
            ]
        }
        echart.setOption(option)
        //监听浏览器窗口大小变化，从而改变图表大小
        window.addEventListener('resize', () => {
            echart.resize()
        })
        global.services.get('/loca/loca/overview/producttypesales').then(res => {
            echart.setOption({
                series: [
                    {
                        data: res.records
                    }
                ]
            })
        })
    }, [])
    return (
        <div ref={ref} style={{ height: '100%' }}>

        </div>
    )
}
