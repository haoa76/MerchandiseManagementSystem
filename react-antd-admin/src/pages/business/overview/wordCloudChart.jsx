import React, { useEffect } from 'react'
import * as echarts from 'echarts'
import 'echarts-wordcloud'

export default function TopChart(props) {
    const ref = React.useRef()
    useEffect(() => {
        const echart = echarts.init(ref.current)
        const option = {
            tooltip: {
                show: true,
            },
            series: [
                {
                    type: 'wordCloud',
                    sizeRange: [12, 40],
                    gridSize: 20,
                    textStyle:{
                        fontWeight: 'bold',
                        fontFamily: 'sans-serif',
                        color: function () {
                            return 'rgb(' + [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)
                            ].join(',') + ')';
                        }
                    },
                    data:[]
                }
            ]
        }
        echart.setOption(option)
        //监听浏览器窗口大小变化，从而改变图表大小
        window.addEventListener('resize', () => {
            echart.resize()
        })
        global.services.get('/loca/loca/overview/hotwords').then(res => {
            echart.setOption({
                series: [{ data: res.records }]
            })
        })
    }, [])
    return (
        <div ref={ref} style={{ height: '100%' }}>

        </div>
    )
}

