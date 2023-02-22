import { createSlice } from "@reduxjs/toolkit";
// preloading data here so we can globally use
import data from '../assets/real_geo.json'


const settingsSlice = createSlice({
    name:'settings',
    initialState:{
        renderOptions:{
            showMarkers:true,
            showHeatmap:true,
            flyToPoint:false,
            showMarkerPopup:true,
        },
        filterOptions:{
            Low:true,
            Medium:true,
            High:true
        },
        // selectStates:true,
        markerToHilite:-1,
        selectStates:false,
        selectedMarkers:[],
        selectedStates:[],
        data:data.map(d=>({...d,show:true})),
    },
    reducers: {
        flipRenderOption: (state,action) => {
            const key = action.payload
            state.renderOptions[key] = !state.renderOptions[key]
            // console.log(`flipping ${key}`)
        },
        flipFilterOption: (state,action) => {
            const key = action.payload
            state.filterOptions[key] = !state.filterOptions[key]
            // console.log(`flipping ${key}`)
        },
        flipOption: (state,action) => {
            state[action.payload] = !state[action.payload]
        },
        toggleMarkerSelection: (state,action) => {
            const {target,source} = action.payload

            if(state.selectedMarkers.includes(target)){
                // if(source !== 'marker')
                state.selectedMarkers = state.selectedMarkers.filter((el) => el!==target)
                if(target === state.markerToHilite) state.markerToHilite = '-1'
    
            }else{
                state.selectedMarkers.push(target)
            }
        },
        toggleStateSelection: (state,action) => {
            const id = action.payload
            // if(state.selectedStates.length === 0)
            //     state.selectedMarkers = []

            if(state.selectStates)
                state.selectedStates.includes(id)
                ? state.selectedStates = state.selectedStates.filter((el) => el!==id)
                : state.selectedStates.push(id)
        },
        setData: (state,action) => {
            state.data = action.payload
        },
        setMarkerHilite: (state,action) => {
            state.markerToHilite = action.payload
        },
        emptyStateSelection: (state,action) => {
            state.selectedStates = []
        },
        undoHilite: (state,action) => {
            if(action.payload === state.markerToHilite)
                state.markerToHilite = '-1'
        }
    }

})

export const { 
    flipRenderOption,
    toggleMarkerSelection,
    setData,
    toggleStateSelection,
    setMarkerHilite,
    emptyStateSelection,
    flipOption,
    undoHilite,
    flipFilterOption,
} = settingsSlice.actions
export default settingsSlice.reducer