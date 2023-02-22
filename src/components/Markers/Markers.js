import { useMap, CircleMarker, Popup, GeoJSON } from 'react-leaflet'
import L from 'leaflet';
import { useEffect,useState,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMarkerSelection, undoHilite } from '../../redux/settingsSlice';
import { cyan, volcano,grey,purple,geekblue,lime, magenta } from '@ant-design/colors'
import { probToCol } from '../OnePoint/OnePoint'
// const [blue,orange,mint,gray,pinkish,yellowgreen] = ['#2537a8','#ff7800','#42f5bf','#787982','#cf03fc','#a1fc03']

const probToNum = {
    'High':6,
    'Medium':3,
    'Low':0,
}

const defaultRadius = 4;

const defaultMarkerStyle = probability => ({
    default:{
        radius:defaultRadius,
        fillColor: volcano[1+probToNum[probability]],
        color:"#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    },
    selected:{
        radius:defaultRadius+3,
        fillColor: lime[1+probToNum[probability]],
        color:"#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    },
    selectedHilight:{
        radius:defaultRadius + 5,
        fillColor: lime[3+probToNum[probability]],
        color:geekblue[0],
        weight: 2,
        opacity: .8,
        fillOpacity: 0.8
    }
})

const stateMarkerStyle = probability => ({
    default:{
        radius:defaultRadius,
        fillColor: cyan[1+probToNum[probability]],
        color:"#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    },
    selected:{
        radius:defaultRadius + 3,
        fillColor: geekblue[1+probToNum[probability]],
        color:"#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    },
    empty: {
        radius:0,
        opacity:0,
        fillOpacity: 0.2,
        fillColor:grey[3],
        color:grey[1],
        weight:1,
    },
    selectedHilight:{
        radius:defaultRadius + 5,
        fillColor: geekblue[1+probToNum[probability]],
        color:magenta[4],
        weight: 2,
        opacity: .8,
        fillOpacity: 0.8
    }
})
const Markers = ({}) => {
    const [
        data,
        showMarkers,
        selectStates,
        showMarkerPopup,
        markerToHilite,
        selectedMarkers,
        selectedStates,
        filterOptions
    ] = useSelector(state => [
        state.settings.data,
        state.settings.renderOptions.showMarkers,
        state.settings.selectStates,
        state.settings.renderOptions.showMarkerPopup,
        state.settings.markerToHilite,
        state.settings.selectedMarkers,
        state.settings.selectedStates,
        state.settings.filterOptions
    ])

    const targetLabel = data

    const dispatch = useDispatch()

    const getMarkerStyle = feature => {
        var isSelected = selectedMarkers.includes(feature.id)
        var isAnyStateSelected = selectedStates.length > 0
        var isStateSelected = selectedStates.includes(feature.properties.stateId)
        if(feature.id === markerToHilite){
            console.log('i hilight',isSelected,isStateSelected)
        }

        let stateMarker = stateMarkerStyle(feature.properties.Target_Label)
        let defaultMarker = defaultMarkerStyle(feature.properties.Target_Label)

        // logics layout
        // If any state is selected, all points outside must be 'empty'
        let markerStyle = isAnyStateSelected
            // If point is inside the state, we color it 
            ? isStateSelected
                // checking if point has been selected
                ? isSelected
                    ? stateMarker.selected
                    : stateMarker.default
                // at this level, some state is selected but not this points state.
                // we don't like this guy
                : stateMarker.empty
            // no state is selected.
            : selectStates
                ?stateMarker.empty
                :isSelected
                ? defaultMarker.selected
                : defaultMarker.default

        if(feature.id === markerToHilite){
            markerStyle = (isAnyStateSelected && isStateSelected)
                ? stateMarker.selectedHilight
                : defaultMarker.selectedHilight
        }

        if(!filterOptions[feature.properties.Target_Label]){
            markerStyle = stateMarker.empty
        }
        markerStyle.radius *= map.getZoom()/10
        return markerStyle
    }

    const resizeMarker = (layer,zoomVal) => {
        // console.log(zoomVal)
        if(zoomVal <= 7){
            layer.setRadius(getMarkerStyle(layer.feature).radius*zoomVal/10)
        }else{
            layer.setRadius(getMarkerStyle(layer.feature).radius*zoomVal/10 * 2)
        }
    }

    const updateRender = layer => {
        layer.setStyle(getMarkerStyle(layer.feature))
    }


    const map = useMap()
    
    const geo = useRef()

    map.on('zoomend',()=>{
        geo.current.eachLayer(l=>resizeMarker(l,map.getZoom()))
    })

    useEffect(() => {

        geo.current.eachLayer(l => {updateRender(l); resizeMarker(l,map.getZoom())})
    },
        [markerToHilite,selectedMarkers,selectedStates,selectStates,filterOptions]
    )

    useEffect(() =>{
        showMarkerPopup
        ?geo.current.eachLayer(
            l => l.bindPopup(
                `
                <b>${l.feature.properties.name}</b>
                <br/>
                Predicted danger: <t style="color:${probToCol[l.feature.properties.Target_Label]}">${l.feature.properties.Target_Label}</t>
                `
            ))
        :geo.current.eachLayer(l => l.unbindPopup())
    },[showMarkerPopup])

    return(
    showMarkers
    ?<GeoJSON
        data={data}
        ref={geo}
        // filter={(pt) => !selectState || selectedState!==pt.properties.stateId}
        pointToLayer={(feature,latlng) => {
            // console.log(feature)
            return new L.CircleMarker(
                            latlng,
                            getMarkerStyle(feature),
                            // defaultMarkerStyle(feature.properties.Target_Label).default,
                            {
                                interactive: true,
                                pane: 'markerPane'
                            }
                            )
        }}
        onEachFeature={(feature,marker)=>{
           
            
            marker.on({
                click: (e) => {          
                    console.log('markerclick! ', selectedMarkers)
                    dispatch(toggleMarkerSelection({
                        target: e.target.feature.id,
                        source:'marker'
                    }))
                    dispatch(undoHilite(e.target.feature.id))
                },
            })
        }}
    />:<></>
    )
}

export default Markers