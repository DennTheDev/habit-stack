import React, { useState } from "react";
import {
    useSensors,
    useSensor,
    PointerSensor,
    KeyboardSensor,
    DndContext,
    closestCenter,
    pointerWithin,
    closestCorners,
    DragOverlay,
    defaultDropAnimation,
} from "@dnd-kit/core";
import {
    sortableKeyboardCoordinates,
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
    rectSortingStrategy,
    rectSwappingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { Item } from "./Item";
import { Card } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Container from "./Container";
const BoardII = () => {
    const defBoard =  ["1", "5", "2", "3", "6", "4"];
    const [board, setBoard] = useState(defBoard);
    const [last,setLast]=useState(6);
    const [activeId, setActiveId] = useState(null);
    
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );
    
    const handleDragStart = ({ active }) => {
        setActiveId(active.id);
    };

    const handleDragOver = ({ active, over }) => {
        if (over && active.id !== over.id) {
            setBoard((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleDragEnd = ({ active, over }) => {
        setActiveId(null);
    };

    const addHandler=()=>{
        setBoard((items)=> [...items,""+(last+1)]);
        setLast((last)=>last+1);
    }
    
    const dropAnimation = {
        ...defaultDropAnimation,
    };
    return (
        <>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <div className={'h-96'}>
                        <Container id={'c1'} key={'c1'}>
                            <SortableContext
                                items={board}
                                strategy={disableSortingStrategy}
                            >
                                <div className={"flex flex-row flex-wrap justify-start gap-2 h-max"} >
                                    {board.map((id) => (
                                        <SortableItem key={id} id={id} activeId={activeId} />
                                    ))}
                                </div>
                            </SortableContext>
                        </Container>
                    <DragOverlay>
                        {activeId ? (
                            <Item id={activeId}>{activeId}</Item>
                        ) : null}
                    </DragOverlay>
                </div>
            </DndContext>
            <div className={'grid justify-items-end p-2'}>
            <Button onClick={addHandler}> Add Tile</Button>
            </div>
        </>
    );
    function disableSortingStrategy() {
        return null;
    }
};

export default BoardII;
