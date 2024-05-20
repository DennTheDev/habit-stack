import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';

import {Droppable} from './Droppable';
import {Draggable} from './Draggable';

export function Dnd() {
  const [isDropped1, setIsDropped1] = useState(false);
  const [isDropped2, setIsDropped2] = useState(false);
  const [isDropped3, setIsDropped3] = useState(false);
  const draggableMarkup = (
    <Draggable>Drag me</Draggable>
  );

  return (
    <div className={"grid lg:grid-cols-3 justify-left sm:justify-center"}>
    <DndContext onDragEnd={handleDragEnd}>
      <Droppable id={'1'} >
        <div className={'text-center py-16 '}>
        {isDropped1 ? draggableMarkup : 'Drop here'}
        </div>
      </Droppable>
      <Droppable id={'2'}>
        <div className={'text-center py-16'}>
        {isDropped2 ? draggableMarkup : 'Drop here'}
        </div>
      </Droppable>
      <Droppable id={'3'}>
        <div className={'text-center py-16'}>
        {isDropped3 ? draggableMarkup : 'Drop here'}
        </div>
      </Droppable>
      {!(isDropped1||isDropped2||isDropped3) ? draggableMarkup : null}
    </DndContext>
    </div>
  );

  function handleDragEnd(event) {
    resetState();
    if(event.over){
      switch (event.over.id){
        case '1':
          setIsDropped1(true);
          break;
        case '2':
          setIsDropped2(true);
          break;
        case '3':
          setIsDropped3(true);
          break; 
      }
    }
  }

  function resetState(){
    setIsDropped1(false);
    setIsDropped2(false);
    setIsDropped3(false);
  }
}