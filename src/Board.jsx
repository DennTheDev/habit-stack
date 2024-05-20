import React, { useState } from "react";
import {
    useSensors,
    useSensor,
    PointerSensor,
    KeyboardSensor,
    DndContext,
    closestCorners,
    DragOverlay,
    defaultDropAnimation,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove,SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import {SortableItem} from './SortableItem';
import {Item} from './Item';
import {Card } from '@/components/ui/card';
import Container from './Container';
const titles={
    c1: 'Product Backlog',
    c2: 'Sprint Backlog',
    c3: 'In Progress',
    c4: 'Review',
    c5: 'Done',
}
const Board = () => {
    const defBoard = { c1: ['1','5'], c2: ['2'], c3: ['3','6'], c4: ['4'],c5:['7','8'] };
    const [board, setBoard] = useState(defBoard);
    const [activeId, setActiveId] = useState(null);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const findColumn = (board, ID) => {
        if (ID in board) return ID;
        const column = Object.keys(board).find((key) =>
            board[key].find((id) => id === ID),
        );
        return column;
    };

    const handleDragStart = ({ active }) => {
        setActiveId(active.id);
    };

    const handleDragOver = ({ active, over }) => {
        const activeContainer = findColumn(board, active.id);
        const overContainer = findColumn(board, over?.id);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer === overContainer
        ) {
            return;
        }

        setBoard((board) => {
            const activeItems = board[activeContainer];
            const overItems = board[overContainer];

                const activeIndex = activeItems.indexOf(active.id);
            const overIndex = overItems.indexOf(over?.id);

            return {
                ...board,
                [activeContainer]: [
                    ...board[activeContainer].filter(
                        (item) => item !== active.id,
                    ),
                ],
                [overContainer]: [
                    ...board[overContainer].slice(0, overIndex),
                    board[activeContainer][activeIndex],
                    ...board[overContainer].slice(
                        overIndex,
                        board[overContainer].length,
                    ),
                ],
            };
        });
    };

    const handleDragEnd = ({ active, over }) => {
        const activeContainer = findColumn(board, active.id);
        const overContainer = findColumn(board, over?.id);
        
        if (
            !activeContainer ||
            !overContainer ||
            activeContainer !== overContainer
        ) {
            return;
        }

        const activeIndex = board[activeContainer].indexOf(active.id);
        const overIndex = board[overContainer].indexOf( over?.id);

        if (activeIndex !== overIndex) {
            setBoard((board) => ({
                ...board,
                [overContainer]: arrayMove(
                    board[overContainer],
                    activeIndex,
                    overIndex,
                ),
            }));
        }
        setActiveId(null);
    };

    const dropAnimation = {
        ...defaultDropAnimation,
    };
    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className={'grid grid-cols-5'}>
                {Object.keys(board).map((key) => (
                    <SortableContext
                        id={key}
                        key={key}
                        items={board[key]}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className={'text-center'}>
                            {titles[key]}
                        <Container k={key}>
                            {board[key].map((id) => (
                                <SortableItem key={id} id={id} activeId={activeId} />
                            ))}
                        </Container>
                        </div>
                    </SortableContext>
                ))}
                <DragOverlay dropAnimation={dropAnimation}>
                    {activeId ? <Item >{activeId}</Item> : null}
                </DragOverlay>
            </div>
        </DndContext>
    );
};

export default Board;
