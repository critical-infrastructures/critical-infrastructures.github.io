import { useDispatch, useSelector } from "react-redux"
import { MapContainer, TileLayer } from 'react-leaflet'

import HeatMap from '../../components/HeatMap/HeatMap';
import Markers from '../../components/Markers/Markers';
import MapInfo from "../../components/MapInfo/MapInfo";
import StateDisplay from "../../components/StateDisplay/StateDisplay";


const avg = (arr) => arr.reduce((a, b) => a + b) / arr.length;

const MapPage = ({}) => {
    const [
        data
    ] = useSelector((state) => [
        state.settings.data
    ])


	const center = [
        avg(data.map(r=>r.geometry.coordinates[1])),
        avg(data.map(r=>r.geometry.coordinates[0]))
    ]

    return(
        <MapContainer
            center={center} 
            zoom={7} 
            useGesture={true}
            style={{
                    height:'100%',
                    width:'100vw'
                    }}
            tap={false}
            >
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapInfo />
            <Markers />
            <HeatMap />
            <StateDisplay />
        </MapContainer>
    )
}

export default MapPage;