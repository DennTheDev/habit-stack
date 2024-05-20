import React from 'react'
import {useDroppable} from '@dnd-kit/core';
import {Card} from '@/components/ui/card'
const Container=(props)=>{
    const {isOver, setNodeRef} = useDroppable({
        id: props.k,
      });
    return(<div className={'grid flex flex-col border-0 text-center justify-items-center'} ref={setNodeRef}>{props.children}</div>
    );
}

export default Container;