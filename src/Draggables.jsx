import React,{useReducer,useEffect} from 'react';
import {useDraggable,DndContext} from '@dnd-kit/core';
import {Draggable} from './Draggable';
import {motion} from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

let defaultState={lastId:99};
const reducer=(state,action)=>{
  if(action.type=='add'){
    state={...state,
           [''+(state.lastId+1)]:<Draggable id={state.lastId+1} key={state.lastId+1} > 
                                  {state.lastId+1}
                                </Draggable>,
           lastId: state.lastId+1,
          }
  }
  return state;
}
export default (props)=>{
  const[draggables,setDraggables]=useReducer(reducer, defaultState);
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: '9969',
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;
  useEffect(()=>{
    setDraggables({type:'add'});
  },[])

  return (
    // <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
    //   <Card className={"p-2 w-24 h-24 my-2 text-center py-8"}>
    //   {props.children}
    //   </Card>
    // </button>
    <>{Object.keys(draggables).map((item)=> item!='lastId'? draggables[item]:null)}</>
  );
}