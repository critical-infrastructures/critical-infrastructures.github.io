import { useMap } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import { setMarkerHilite,toggleMarkerSelection } from '../../redux/settingsSlice'
import { CloseOutlined, AimOutlined } from '@ant-design/icons'
import { Button,Collapse, Tooltip, Table, Row, Col } from 'antd'
import { red,orange,blue } from '@ant-design/colors'

import './OnePoint.css'

export const probToCol = {
    'High': red[6],
    'Medium':orange[6],
    'Low':blue[6]
}


const propertyFmt = [
    {
        name:'Target_Label',
        showName:'Predicted Danger',
        fmt: v => <b style={{color:probToCol[v]}}>{`${v}`}</b>,
    },
    {
        name:'name',
        showName: 'Facility Name',
        fmt:v => `${v}`,
    },
    {
        name:'state',
        showName: 'State',
        fmt:v => `${v}`,
    },
    {
        name:'city',
        showName: 'City',
        fmt:v => `${v}`,
    },
    {
        name:'precipitation',
        showName: 'Precipitation',
        fmt:v => `${(v*1000).toFixed(2)} mm/hr`,
    },
    {
        name:'soil_moisture', 
        showName: 'Soil Moisture',
        fmt:v => `${v.toFixed(2)} m³`
    },
    {
        name:'elevation',
        showName: 'Elevation',
        fmt: v => `${v} ft`,
    },
    // {
    //     name:'run',
    //     showName: 'Run',
    //     fmt:v => `${v}`,
    // },
    {
        name:'slope',
        showName: 'Slope',
        fmt:v => `${v.toFixed(2)}%`,
    },
    {
        name:'landslide_prob',
        showName: 'Landslide Probability',
        fmt: v => `${v}`,
    },
    {
        name:'energy',
        showName: 'Earthquake Energy',
        fmt: v => `${v} J`,
    },
    
]

const tableColumns = [
    {title:'Attribute',dataIndex:'attr',key:'attr',width:'30%'},
    {title:'Value',dataIndex:'val',key:'val'},
]

const buildData = (pt) => {
    let dataSource = [{
        key:'1',
        attr:<b>Location</b>,
        val: `(${pt.geometry.coordinates[0].toFixed(4)},\n${pt.geometry.coordinates[1].toFixed(4)})`
    }]

    for(let p of propertyFmt){
        dataSource.push({
            key: `${dataSource.length+1}`,
            attr:<b>{p.showName}</b>,
            val:p.fmt(pt.properties[p.name])
        })
    }

    return dataSource
}


const OnePoint = ({markerId}) => {
    const [
        data,
        flyToPoint
    ] = useSelector(state => [
        state.settings.data,
        state.settings.renderOptions.flyToPoint
    ])

    const dispatch = useDispatch()
    const map = useMap()


    return(
    <div 
        className='one-point'
        key = {markerId}
    >
        <Collapse>
            <Collapse.Panel
                header={<b>{data[markerId].properties.name}</b>}
            >
                <Row
                    // flex
                    align='middle'
                    justify='center'
                    style={{marginTop:5}}
                >
                    <Col
                        span={8}
                    >
                        <Tooltip 
                            title="Click to locate plant"
                            style={{zIndex:9999}}
                        >
                            <Button
                                size='small'
                                // shape='round'
                                onClick={() => {
                                    console.log('remove marker trigger')
                                    dispatch(setMarkerHilite(markerId))
                                    if(flyToPoint) 
                                        map.flyTo(
                                            [data[markerId].geometry.coordinates[1],data[markerId].geometry.coordinates[0]],
                                            map.getZoom() > 5 ? map.getZoom() : 5
                                        )
                                }}
                                style={{backgroundColor:'rgba(112, 110, 110, 0.527)'}}
                            >
                                <AimOutlined style={{ fontSize: '12px',fontWeight:'bold' }}/>
                            </Button>
                        </Tooltip>
                    </Col>
                    <Col
                        offset={8}
                        span={8}
                        align='right'
                    >
                        <Tooltip 
                            title="Click to remove plant from selection"
                            style={{zIndex:9999}}>

                            <Button
                                size='small'
                                // shape='round'
                                onClick={() => {
                                    console.log('remove marker trigger')
                                    dispatch(toggleMarkerSelection({
                                        target: markerId,
                                        source:'info'
                                    }))
                                }}
                                style={{
                                    backgroundColor:'rgba(218, 35, 35, 0.527)'
                                }}
                            >
                                <CloseOutlined style={{ fontSize: '16px',fontWeight:'bold' }}/>
                            </Button>
                            
                        </Tooltip>
                    </Col>
                </Row>
                <Table 
                    dataSource={buildData(data[markerId])} 
                    columns={tableColumns}
                    size="small"
                    showHeader={false}
                    pagination={false}
                    style={{
                        fontSize:'12px',
                    }}
                />
                
            </Collapse.Panel>
        </Collapse>
    
    </div>)}


export default OnePoint