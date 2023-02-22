import { GeoJSON } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect,useRef } from 'react'
import stateData from  '../../assets/us-states.json'
import { toggleStateSelection } from '../../redux/settingsSlice'
import { magenta, purple } from '@ant-design/colors'

const defaultDisplay = {
    default:{
        color: purple[4],
        opacity: 0.3,
        weight: 1
    },
    hover:{
        weight: 2,
        color: purple[6]
    },
    selected:{
        weight: 3,
        opacity: 0.5,
        color: purple[6]
    } 
}

const selectDisplay = {
    default: {
        color: magenta[4],
        weight: 1,
        opacity: 0.4,
        fillOpacity: 0.01,
    },
    hover: {
        weight: 3,
        color: magenta[6]
    },
    selected: {
        weight: 4,
        opacity: 0.6,
        color: magenta[6]
    }
}

const StateDisplay = () => {
    const [
        selectStates,
        selectedStates
    ] = useSelector(state => [
        state.settings.selectStates,
        state.settings.selectedStates
    ])

    const dispatch = useDispatch()
    const geo = useRef()

    const updateRender = (l) => {
        l.setStyle(
            selectStates?
                selectedStates.includes(l.feature.id)
                ?selectDisplay.selected
                :selectDisplay.default
            :selectedStates.includes(l.feature.id)
                ?defaultDisplay.selected
                :defaultDisplay.default
        )
    }

    useEffect(() => {
        if(geo.current){

            geo.current.eachLayer(l => {
                updateRender(l)
                l.on({
                    mouseover: (e) => {
                        const auxLayer = e.target;
                        auxLayer.setStyle(
                            selectStates 
                            ?selectDisplay.hover 
                            :defaultDisplay.hover
                        )
                    },
                    mouseout: (e) => {
                        const auxLayer = e.target;
                        selectedStates.includes(e.target.feature.id)
                        ? auxLayer.setStyle(selectStates ? selectDisplay.selected : defaultDisplay.selected)
                        : auxLayer.setStyle(selectStates ? selectDisplay.default : defaultDisplay.default)
                    },
                })
            })
        }
    },[selectStates,selectedStates,selectStates])
    
    
    return(
    selectStates
    ?<GeoJSON
        ref={geo}
        data={stateData}
        onEachFeature={(feature,layer) => {
            layer.on({
                click: (e) => dispatch(toggleStateSelection(e.target.feature.id))               
            })

            if(selectedStates.includes(feature.id)){
                layer.setStyle(selectStates? selectDisplay.selected : defaultDisplay.selected)
            }
        }}
        pathOptions={selectStates ? selectDisplay.default : defaultDisplay.default}
    >

    </GeoJSON>
    :<></>)
}

export default StateDisplay