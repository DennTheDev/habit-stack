import React, { useState, useReducer } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import ExpandIcon from "./ExpandIcon";
import { SortableNote } from "./SortableNote";
import { NotesItem } from "./NotesItem";
import Container from "./Container";
import AddIcon from './AddIcon';
import * as _ from 'lodash';
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
import {
    sortableKeyboardCoordinates,
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const reducer = (state, action) => {
    if(action.type==='add'){
        state= {...state, [action.id]:{
            title:'',
            content:'',
            isOpen:false,
        }}
    }
    else if(action.type==='delete'){
        const {[action.id]: $ , ...rest} = state;
        return rest;
    }
    else if (action.type === "editTitle") {
        state = {
            ...state,
            [action.id]: {
                ...state[action.id],
                title: action.load,
            },
        };
    } else if (action.type === "editContent") {
        state = {
            ...state,
            [action.id]: {
                ...state[action.id],
                content: action.load,
            },
        };
    } else if (action.type === "toggleOpen") {
        state = {
            ...state,
            [action.id]: {
                ...state[action.id],
                isOpen: !state[action.id].isOpen,
            },
        };
    }
    return state;
};

const default_state = {
    1: {
        title: "Note 1",
        content: "Lorem ipsum dolor sit ",
        isOpen: false,
    },
    2: {
        title: "Note 2",
        content:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum soci",
        isOpen: false,
    },
    3: {
        title: "Note 3",
        content:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridic",
        isOpen: false,
    },
    4: {
        title: "Note 4",
        content:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis na",
        isOpen: false,
    },
    5: {
        title: "Note 4",
        content:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis na",
        isOpen: false,
    },
    6: {
        title: "Note 4",
        content:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis na",
        isOpen: false,
    },
};

const defCols = { c1: ["1", "2","3"], c2: ["4","5"], c3: ["6"] };

const NotesII = () => {
    const [state, dispatch] = useReducer(reducer, default_state);
    const [activeId, setActiveId] = useState(null);
    const [columns, setColumns] = useState(defCols);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );
    const findColumn = (columns, ID) => {
        if (ID in columns) return ID;
        const column = Object.keys(columns).find((key) =>
            columns[key].find((id) => id === ID),
        );
        return column;
    };

    const handleDragStart = ({ active }) => {
        setActiveId(active.id);
    };

    const handleDragOver = ({ active, over }) => {
        const activeContainer = findColumn(columns, active.id);
        const overContainer = findColumn(columns, over?.id);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer === overContainer
        ) {
            return;
        }

        setColumns((columns) => {
            const activeItems = columns[activeContainer];
            const overItems = columns[overContainer];

            const activeIndex = activeItems.findIndex(
                (item) => item === active.id,
            );
            const overIndex = overItems.findIndex((item) => item !== over?.id);

            return {
                ...columns,
                [activeContainer]: [
                    ...columns[activeContainer].filter(
                        (item) => item !== active.id,
                    ),
                ],
                [overContainer]: [
                    ...columns[overContainer].slice(0, overIndex),
                    columns[activeContainer][activeIndex],
                    ...columns[overContainer].slice(
                        overIndex,
                        columns[overContainer].length,
                    ),
                ],
            };
        });
    };

    const handleDragEnd = ({ active, over }) => {
        const activeContainer = findColumn(columns, active.id);
        const overContainer = findColumn(columns, over?.id);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer !== overContainer
        ) {
            return;
        }

        const activeIndex = columns[activeContainer].findIndex(
            (task) => task === active.id,
        );
        const overIndex = columns[overContainer].findIndex(
            (task) => task === over?.id,
        );

        if (activeIndex !== overIndex) {
            setColumns((columns) => ({
                ...columns,
                [overContainer]: arrayMove(
                    columns[overContainer],
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

    const expandHandler = (event, id) => {
        dispatch({ type: "toggleOpen", id: id });
    };
    const contentChangeHandler = (event, id) => {
        dispatch({ type: "editContent", id: id, load: event.target.value });
    };
    const titleChangeHandler = (event, id) => {
        dispatch({ type: "editTitle", id: id, load: event.target.value });
    };
    const deleteHandler= (event,id,column) =>{
        setColumns(prev=> {return {...prev, [column]: _.filter(prev[column],(item)=> item!=id)}});
        dispatch({type:"delete",id:id});
    };
    const addHandler=(event) =>{
        const x=Date.now();
        const col=_.minBy(Object.keys(columns),(k=> columns[k].length));
        setColumns(prev=>{return {...prev,[col]:_.concat(prev[col],x)}});
        dispatch({type:'add',id:x});
    }
    return (
        <>
        <Card className="border-0 flex justify-end p-2" onClick={(e)=>addHandler(e)}><AddIcon /></Card>
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className={"grid grid-cols-3"}>
                {Object.keys(columns).map((ckey) => (
                    <SortableContext
                        id={ckey}
                        key={ckey}
                        items={columns[ckey]}
                        strategy={verticalListSortingStrategy}
                    >
                        <div>
                            <Container k={ckey}>
                                {columns[ckey].map((key) => {
                                    return (
                                        <SortableNote
                                            id={key}
                                            key={key}
                                            {...state[key]}
                                            column={ckey}
                                            expandHandler={expandHandler}
                                            contentChangeHandler={
                                                contentChangeHandler
                                            }
                                            titleChangeHandler={
                                                titleChangeHandler
                                            }
                                            deleteHandler={deleteHandler}
                                        />
                                    );
                                })}
                            </Container>
                        </div>
                    </SortableContext>
                ))}
                <DragOverlay dropAnimation={dropAnimation}>
                    {activeId ? (
                        <NotesItem id={activeId} {...state[activeId]} />
                    ) : null}
                </DragOverlay>
            </div>
        </DndContext>
        </>
    );
};
export default NotesII;
