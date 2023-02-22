import { useEffect, useState } from 'react'
import './MapInfo.css'
import { LeftOutlined, RightOutlined,DragOutlined } from '@ant-design/icons'
import { useDraggable } from 'use-draggable'
import { useMap } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import OnePoint from '../OnePoint/OnePoint'
import { useDrag } from 'react-dnd'



const MapInfo = ({}) => {
    const map = useMap()
    const [state,setstate] = useState({expanded:true})
    const { targetRef } = useDraggable({
                                        controlStyle:true,
                                    })
    const [
        selected,
    ] = useSelector(state => [
        state.settings.selectedMarkers,
    ])

    // disables map dragging when info tag is dragged
    useEffect(()=>{
        if(targetRef && targetRef.current){
            targetRef.current.addEventListener(
                'mouseover',
                ()=>{
                    map.dragging.disable()
                    map.scrollWheelZoom.disable()
                }
            )
            targetRef.current.addEventListener(
                'mouseout',
                ()=>{
                    map.dragging.enable()
                    map.scrollWheelZoom.enable()
                }
            )
        }
    },[])

    const toggleMin = () => setstate({...state,expanded:!state.expanded})

    
    return(
    <div 
        className={`MapInfo ${state.expanded ? 'expanded' : 'minimized'}`} 
        ref={targetRef}
    >
        
        <div className='content-header'>
            {state.expanded
            ?'Selected points'
            :<></>
            }
        </div>
        <div className='main-content'>
        {state.expanded
            ?<div className='content-panels'>
                {selected.map(markerId=>
                    <OnePoint key={markerId} markerId={markerId}/>
                )}
         
            </div>
            :
            <div className='drag-handle'>
                <DragOutlined style={{fontSize:'150%'}}/>
            </div>
        }
        </div>
        <div className='btn-notch' onClick={toggleMin}>
        {state.expanded
            ?<LeftOutlined style={{fontSize:'150%'}}/>
            :<RightOutlined style={{fontSize:'150%'}}/>
        }
        </div>
        <>
        </>
        
    </div>
    )
}

export default MapInfo