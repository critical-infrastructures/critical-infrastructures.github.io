import { useMap } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet.heat'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const labelToNum ={
    'High':10,
    'Medium':5,
    'Low':1,
} 


const HeatMap = ({}) => {
    const map = useMap()
    const [state,setstate] = useState({layer:false})
    const [showHeatmap,data] = useSelector((state) => [
        state.settings.renderOptions.showHeatmap,
        state.settings.data
    ])

    useEffect(()=>{
        if(showHeatmap){
            let heat = L.heatLayer(
                data.map(
                    p => [
                        p.geometry.coordinates[1],
                        p.geometry.coordinates[0],
                        labelToNum[p.properties.Target_Label]
                    ]
                ),{radius:50}
            ).addTo(
                map
            )
            setstate({layer:heat})
        }else{
            if(state.layer !== false) {
                state.layer.remove()
            }
        }
    },[showHeatmap]
    )
    return null
}

export default HeatMap