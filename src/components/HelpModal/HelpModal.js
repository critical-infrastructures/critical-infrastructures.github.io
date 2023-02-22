
import { useState } from 'react';
import { Modal, Button, Row, Col } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { cyan, volcano } from '@ant-design/colors';



const HelpModal = () => {
    Modal.info({
        title: <div style={{width:'100%',textAlign:'center'}}><h4><b>Steps to using the map viewer</b></h4></div>,
        icon: null,
        width:'60%',
    //    onCancel:()=>console.log('ho'),
    // cancelButtonProps:null,
        // cancelText: null,
        content: (
            <Row
                gutter={[0,20]}
                style={{
                    marginLeft:0,
                    marginRight:0,
                }}
                wrap
            >
                <Row>
                <Col
                    span={11}
                >
                    <b>Map description</b>
                    <br/>
                    - Each marker represents a powerplant 
                    <br/>
                    - The colors represent the prediction of our model on the possible dangers to that facility, ranging from <b style={{'color':volcano[2]}}>low</b>, <b style={{'color':volcano[4]}}>medium</b> to <b style={{'color':volcano[7]}}>high</b>
                    <br/>
                    - You can choose to hide markers or the heatmap by using the render options menu
                    <br/>
                    - You can also choose danger levels to filter the points by
                    <br/>
                    - To learn more about our dataset, visit the about page!
                </Col>
                <Col
                    offset={2}
                    span={11}
                >
                    <b>Selecting and highlighting by states</b>
                    <br/>
                    1. Switch on the <b>show and select states</b> option (this is disabled by default)
                    <br/>
                    2. Select state(s) of interest. 
                    <br/>
                    3. Once the area is selected, the points inside the area will turn <b style={{color:cyan[3]}}>cyan</b>
                    <br/>
                    4. Exit state selection mode and select points of interest
                    <br/>
                    - In order to select points, you must first disable the state select mode by selecting the <b>show and select states</b>
                    <br/>
                    - Once you are done, you can simply press <b>clear state selection</b> and return to default view (this will not clear your selected points!)
                </Col>
                </Row>
                <Row
                    style={{fontSize:12}}
                >
                    <Col span={24}>
                    <b>
                        tips:
                    </b>
                    </Col>
                    <Col span={24}>
                        If you select a point on your information panel, the selected point will be highlighted on the map
                    </Col>
                    <Col span={24}>
                        If you would also like to bring the point to the center, enable the 'fly to point' option in the render menu
                    </Col>
                </Row>
            </Row>)
    })
}

export default HelpModal