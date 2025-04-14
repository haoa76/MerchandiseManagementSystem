import React, { useEffect } from 'react'
import * as echarts from 'echarts'

export default function TopChart(props) {
    const ref = React.useRef()
    useEffect(() => {
        const echart = echarts.init(ref.current)
        const option = {
            tooltip: {
                show: true,
                trigger: 'axis' //鼠标悬浮同时显示成交量和成交额
            },
            grid: {
                left: 10,
                bottom: 10,
                top: 40,
                containLabel: true
            },
            yAxis: [
                { name: '成交量' },
                { name: '成交额' }
            ],
            xAxis: {
                type: 'category',
            },
            series: [
                {
                    name: '成交量',
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    itemStyle: {
                        color: '#73c0de'
                    },
                },
                {
                    name: '成交额',
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    itemStyle: {
                        color: 'red'
                    },
                    yAxisIndex: 1,
                    datasetIndex: 1
                }
            ]
        }
        echart.setOption(option)
        //监听浏览器窗口大小变化，从而改变图表大小
        window.addEventListener('resize', () => {
            echart.resize()
        })
        Promise.all([global.services.get('/loca/loca/overview/salestrend', { type: 1 }), global.services.get('/loca/loca/overview/salestrend', { type: 2 })]).then((data = []) => {
            echart.setOption({
                dataset: [{
                    source: data[0].records
                }, {
                    source: data[1].records
                }]
            })
        })
    }, [])
    return (
        <div ref={ref} style={{ height: '100%' }}>

        </div>
    )
}

