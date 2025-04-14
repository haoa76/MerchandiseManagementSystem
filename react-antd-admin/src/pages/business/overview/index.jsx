import React, { useEffect, useState } from 'react'
import { Panel } from '../../../components'
import { Row, Col, Card } from 'antd'
import { MoneyCollectOutlined, FileDoneOutlined, FundViewOutlined, StarOutlined } from '@ant-design/icons'
import './index.scss'
import { numToThousand } from '../../../utils'
import PieChart from './pieChart'
import MapChart from './mapChart'
import TopChart from './topChart'
import BarChart from './barChart'
import LineChart from './lineChart'
import WordCloudChart from './wordCloudChart'
export default function Index() {

    const [statistics, setStatistics] = useState({})
    const onGetStatistics = () => {
        global.services.get('/loca/loca/overview/statistics').then(res => {
            setStatistics(res.record)
        })
    }
    useEffect(() => {
        onGetStatistics()
    }, [])

    return (
        <Panel title="业务概览">
            <div className='m-overview'>
                <Row gutter={10}>
                    <Col span={6}>
                        <Card>
                            <div className='header'>
                                <div className='content'>
                                    <span>总销售额（元）</span>
                                    <span>{numToThousand(statistics.totalTurnover)}</span>
                                </div>
                                <div className='icon' ><MoneyCollectOutlined /></div>
                            </div>
                            <div className='footer'>同比增长：{statistics.turnoverGrowth}</div>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <div className='header'>
                                <div className='content'>
                                    <span>总销售量（个）</span>
                                    <span>{numToThousand(statistics.totalQuantity)}</span>
                                </div>
                                <div className='icon' style={{ backgroundColor: '#36c731ad' }}><FileDoneOutlined /></div>
                            </div>
                            <div className='footer'>同比增长：{statistics.quantityGrowth}</div>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <div className='header'>
                                <div className='content'>
                                    <span>总访问量（次）</span>
                                    <span>{numToThousand(statistics.totalVisited)}</span>
                                </div>
                                <div className='icon' style={{ backgroundColor: '#d25656ad' }}><FundViewOutlined /></div>
                            </div>
                            <div className='footer'>同比增长：{statistics.visitedGrowth}</div>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <div className='header'>
                                <div className='content'>
                                    <span>总收藏量（个）</span>
                                    <span>{numToThousand(statistics.totalStars)}</span>
                                </div>
                                <div className='icon' style={{ backgroundColor: '#3f27a9ad' }}><StarOutlined /></div>
                            </div>
                            <div className='footer'>同比增长：{statistics.startsGrowth}</div>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={10} style={{ marginTop: '10px' }}>
                    <Col span={7}>
                        <Card className='chart-card' title='不同类型商品销售额占比'>
                            <PieChart />
                        </Card>
                    </Col>
                    <Col span={10}>
                        <Card className='chart-card' title='全国商品销售量分布'>
                            <MapChart />
                        </Card>
                    </Col>
                    <Col span={7}>
                        <Card className='chart-card' title='销售量排名 TOP10'>
                            <TopChart />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={10} style={{ marginTop: '10px' }}>
                    <Col span={7}>
                        <Card className='chart-card' title='销售额排名 TOP10'>
                            <BarChart />
                        </Card>
                    </Col>
                    <Col span={10}>
                        <Card className='chart-card' title='销售额增长趋势'>
                            <LineChart/>
                        </Card>
                    </Col>
                    <Col span={7}>
                        <Card className='chart-card' title='热搜词'>
                            <WordCloudChart />
                        </Card>
                    </Col>
                </Row>
            </div>
        </Panel>
    )
}
