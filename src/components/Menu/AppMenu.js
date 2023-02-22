import { Button, Dropdown, Menu, Switch, Modal, Row, Col, Radio, Space, Input, Checkbox } from 'antd'
import { BarChartOutlined, InfoCircleOutlined, SettingOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { flipRenderOption, emptyStateSelection, flipOption } from '../../redux/settingsSlice';
import { Link } from 'react-router-dom';
import './AppMenu.css'
import { useEffect, useState } from 'react';
import HelpModal from '../HelpModal/HelpModal';
import { cyan,volcano } from '@ant-design/colors';
import MapRenderSettings from '../MapRenderSettings/MapRenderSettings';

 
 

const AppMenu = ({ }) => {
	const [
		renderOptions,
		selectedStates,
		selectStates
	] = useSelector((state) => [
		state.settings.renderOptions,
		state.settings.selectedStates,
		state.settings.selectStates,
	])


	const dispatch = useDispatch()
	const handleClick = e => {
		// handle map control
		if (Object.keys(renderOptions).includes(e.key))
			dispatch(flipRenderOption(e.key))
		// if e.key === ''
	};

	return (
		<>
			<Menu
				mode='horizontal'
				forceSubMenuRender={true}
				// openKeys = {openKeys}
				style={{height:'100%'}}
				// selectedKeys={Object.keys(renderOptions).filter(k => renderOptions[k])}
				// selectedKeys={[]}
			>

				<Menu.Item
					key='home'
				>
					<Link to={`/`}>
						<h2 style={{ height: '100%' }}><b>Critical Infrastructures Data</b></h2>
					</Link>
				</Menu.Item>
				<Menu.Item
					key='aboutpage'
				>
					<Link to={`/about`}>
						<BarChartOutlined />
						{'  About the dataset'}
					</Link>
				</Menu.Item>
				<Menu.Item
					key='helpmodal'
					onClick={()=>HelpModal()}
					icon={<><InfoCircleOutlined/>{' Help'}</>}
				>
					{/* <HelpModal /> */}
				</Menu.Item>
				<Menu.Item
					key='selectstate'
				>
					{'Show and select states    '}
					<Switch
						aria-label='showSelectState'
						onChange={() => dispatch(flipOption('selectStates'))}
						defaultChecked={selectStates}
					/>
				</Menu.Item>
				<Menu.Item
					key='clearstate'
				>
					<Button
						type={selectedStates.length > 0 ? 'primary' : 'deafult'}
						onClick={() => dispatch(emptyStateSelection())}
					>
						{'Clear state selection'}
					</Button>
				</Menu.Item>


				
				{/* <MapRenderSettings /> */}
				<Menu.Item
					key='renderOptions'
					// icon={<>
					// 		<SettingOutlined />
					// 		{` Map Render Options`}
					// 	</>}
					
					// onClick={()=>{console.log('hi');setShowModal(true)}}
				>
					<MapRenderSettings/>
				</Menu.Item>
			</Menu>
		</>
	)
}

export default AppMenu