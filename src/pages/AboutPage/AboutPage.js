import { Button, Col, Row, Space } from 'antd'

import MainContent from './MainContent'
import Plot1 from './Plot1'
import Plot2 from './Plot2'
import Plot3 from './Plot3'


import './AboutPage.css'
import { useState } from 'react'

const plots = {
    0: <></>,
    1: <Plot1/>,
    2: <Plot2/>,
    3: <Plot3/>,
}
const AboutPage = () => {
    const [plotToShow,setPlotToShow] = useState(0)

    return(
        <div
            style={{overflowX:'hidden',height:'100%'}}
        >
            {/* <Row
            align='middle'
                justify='center'
            >
                
                
            </Row> */}
            <Row
                // align='middle'
                justify='center'
                style={{width:'100%',marginTop:20}}
                gutter={[10,10]}
            >
                <Col 
                    span={18}
                >
                    <Row
                        align='middle'
                        justify='center'
                        gutter={[0,20]}
                        // style={{border:'1px red solid'}}
                    >
                        <h1><b>About Page</b></h1>
                        <Col
                            align='middle'
                            justify='center'    
                            span={24}
                            // style={{border:'1px grey solid'}}
                        >
                            <MainContent/>
                        </Col>
                        <Col
                            align='middle'
                            justify='center'    
                            span={24}
                            // style={{border:'1px black solid'}}
                        >
                            {plots[plotToShow]}
                        </Col>
                        <Col
                            align='middle'
                            justify='center'    
                            span={24}
                            // style={{border:'1px grey solid'}}
                        >
                            <Button
                                type='primary'
                                onClick={() => setPlotToShow(0)}
                            >
                                Clear
                            </Button>
                        </Col>
                    </Row>

                    

                </Col>
                <Col 
                    span={4}
                    style={{marginTop:80}}
                >
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        <Button
                            onClick={() => setPlotToShow(1)}
                            style={{minWidth:'100%',width:'fit-content'}}
                        >
                            Correlation heatmap
                        </Button>
                        <Button
                            onClick={() => setPlotToShow(2)}
                            style={{minWidth:'100%',width:'fit-content'}}
                        >
                            Distribution before elimination
                        </Button>
                        <Button
                            onClick={() => setPlotToShow(3)}
                            style={{minWidth:'100%',width:'fit-content'}}
                            >
                            Distribution after elimination
                        </Button>
                    </Space>
                    
                    
                </Col>

            </Row>
        </div>
     )
}

export default AboutPage