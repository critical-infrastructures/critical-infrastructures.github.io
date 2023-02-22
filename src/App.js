import 'leaflet/dist/leaflet.css';
import 'antd/dist/antd.min.css'
import './App.css';

import { Layout } from 'antd';

import { Routes, Route } from 'react-router-dom'
import AboutPage from './pages/AboutPage/AboutPage';
import AppMenu from './components/Menu/AppMenu';
import MapPage from './pages/MapPage/MapPage';

const { Content, Footer, Header } = Layout;

const App = () => {
	return(
	
	<Layout style={{height:'100vh'}}>
		<Header
			style={{background: 'white'}}>
				<h1 style={{display:'none'}}>Critical Infrastructures Analysis</h1>
			<AppMenu />
		</Header>
		<Content 
			style={{height:'95vh'}}
		>
			<Routes>
				<Route path={`/`} element={<MapPage/>} />
				<Route path={`/about`} element={<AboutPage/>} />
			</Routes>
		</Content>
		<Footer style={{ textAlign:'center', height:'5vh' }}> 
		Built by <a href='mailto:inwon.kang04@gmail.com' target='_blank' style={{color:'#3344dd'}}>Inwon Kang</a>, Vasundhara Acharya, Anindita  Ghosh, Devanshoo Jain, Mohit Parmar and Thilanka Munasinghe
		<br/>
		<a href="https://www.flaticon.com/free-icons/infrastructure" title="infrastructure icons" style={{color:'#3344dd'}}>Infrastructure icons created by Eucalyp - Flaticon</a>
		</Footer>
	</Layout>
	)
}

export default App;
