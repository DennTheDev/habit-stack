import * as _ from 'lodash';
import {DndContext,DragOverlay} from '@dnd-kit/core';
import {Droppable} from './Droppable';
import {Draggable} from './Draggable';
import {useReducer} from 'react'
import Draggables from './Draggables'
import {SortableList} from './SortableList';
import Board from './Board';
import BoardII from './BoardII'
let x={dropped: false,isdragging:false};
_.range(12).map((i)=>x[""+i]=false)
const default_state={...x};
const dropAnimation={
    duration: 500,
    easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
  };
const draggableMarkup = (
  <Draggable id={'9969'}>Drag me</Draggable>
);
const reducer=(state,action)=>{
  state={...default_state};
  if(action.type=="start"){
    state={...state,isdragging:true, dropped:true}
  }
  else if(action.type=="set"){
    state={...state,[action.key]:true,dropped:true}
  }
  return state;
}
export default()=>{
  const [grid,setGrid]=useReducer(reducer,{...default_state,["0"]:true,dropped:true});
  let content=_.range(12).map((i)=><Droppable key={i} id={i}>
      <div className={'text-center py-7 '}>
      {grid[''+i]? draggableMarkup:null}
      </div>
      </Droppable>);
  return(
    <> 
      {/* <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
        <div className={"grid lg:grid-cols-4 justify-left sm:justify-center"}>
        {content}
        </div>
        <div>{!grid.dropped ? draggableMarkup : null}</div>
        <DragOverlay dropAnimation={dropAnimation}>
          {grid.isdragging?draggableMarkup:null}
        </DragOverlay>
        <Draggables/>
        </DndContext> */}
        {/* <Board/> */}
        <BoardII/>
    </>
      
  );

  function handleDragStart(event) {
    setGrid({type:"start"})
  }

  function handleDragOver(event){
    console.log(event);
    console.log(event.draggingRect)
  }
  function handleDragEnd(event) {
    console.log(event)
    if(event.over){
      setGrid({type:"set",key:event.over.id})
    }
    else{
      setGrid({type:"reset"});
    }
  }
}