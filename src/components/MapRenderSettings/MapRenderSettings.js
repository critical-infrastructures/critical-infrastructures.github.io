import { SettingOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Divider, Menu, Modal, Row, Space } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { flipFilterOption, flipRenderOption } from '../../redux/settingsSlice'
import { probToCol } from '../OnePoint/OnePoint'
import { blue, geekblue, grey, red } from '@ant-design/colors'
import './MapRenderSettings.css'
const renderOptionText = {
    showMarkers:'Display Markers',
    showHeatmap:'Display Heatmap',
    flyToPoint:'Fly to point',
    showMarkerPopup:'Show marker popup',
}



const MapRenderSettings = () => {
    const [
		renderOptions,
        filterOptions
	] = useSelector((state) => [
		state.settings.renderOptions,
        state.settings.filterOptions
	])


	const dispatch = useDispatch()
	const handleRenderOptionClick = e => {
		// handle map control
		if (Object.keys(renderOptions).includes(e.key))
			dispatch(flipRenderOption(e.key))
		// if e.key === ''
	};

    const [showModal,setShowModal] = useState(false)
    return(
        <>
            <Button
                onClick={()=>setShowModal(true)}
            >
                <SettingOutlined />
                {` Map Render Options`}
            </Button>

            <Modal
                visible={showModal}
                onOk={()=>setShowModal(false)}
                onCancel={()=>setShowModal(false)}
                footer={null}
                style={{
                    padding:'3%'
                }}
            > 
                <Row
                    justify='center'
                    style={{
                        marginBottom:20
                    }}
                >
                <b>
                        <SettingOutlined />
                        {` Map Render Options`}    
                    </b>
                </Row>
                <Row
                    justify='center'
                >
                    
                    <Col 
                        span ={10} 
                        style={{
                            // paddingLeft:20,
                            // backgroundColor: grey[3]
                            display:'flex',
                            flexDirection:'column',
                            // justifyContent:'center',
                            alignItems:'middle',
                            gap:'10px'
                        }}
                    >
                        <div style={{width:'100%',textAlign:'center'}}>
                            <b>Filter points</b>
                        </div>
                        
                        {Object.keys(filterOptions).map(k=>
                            <Button
                                onClick={()=>dispatch(flipFilterOption(k))}
                                // type={filterOptions[k] ? 'primary' : 'default'}
                                style={{
                                    width:'100%',
                                    backgroundColor:filterOptions[k] ?probToCol[k] :'white',
                                    color:filterOptions[k] ?'white' :''
                                }}   
                                key={k}
                            >
                                {k}
                            </Button>
                            
                        )}
                    </Col>
                    <Col 
                        offset={4}
                        span={10}
                        style={{
                            // paddingLeft:20,
                            // backgroundColor: grey[3]
                            display:'flex',
                            flexDirection:'column',
                            justifyContent:'center',
                            alignItems:'middle',
                            gap:'10px'
                        }}
                    >
                        <div style={{width:'100%',textAlign:'center'}}>
                            <b>Render Options</b>
                        </div>
                        {Object.keys(renderOptions).map(k=>
                            <Button
                                onClick={()=>dispatch(flipRenderOption(k))}
                                type={renderOptions[k] ? 'primary' : 'default'}
                                style={{
                                    width:'100%',
                                    // backgroundColor:filterOptions[k] ?probToCol[k] :'white',
                                    // color:filterOptions[k] ?'white' :''
                                }}   
                                key={k}
                            >
                                {renderOptionText[k]}
                            </Button>
                            
                        )}
                    </Col>
                </Row>


            </Modal>
            {/* <Menu.Item 
						key="showMarkers"
					>
						Display Markers
					</Menu.Item>
					<Menu.Item 
						key="showHeatmap"
					>
						Display Heatmap
					</Menu.Item>
					<Menu.Item 
						key="showMarkerPopup"
					>
						Display marker popup
					</Menu.Item>
					<Menu.Item 
						key="flyToPoint"
					>
						Fly to selected point
					</Menu.Item> */}
        </>
    )
}

export default MapRenderSettings