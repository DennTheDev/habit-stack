import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import {NotesItem} from "./NotesItem";

export const SortableNote=(props)=>{
    const {
        attributes,
        isDragging,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.id });

    const style = {
        position: "relative",
        display: "inline-block",
        opacity: isDragging ? 0.5 : undefined,
        transform: CSS.Translate.toString(transform),
        transition,
    };

    return (
        <NotesItem ref={setNodeRef} style={style} attributes={attributes} listeners={listeners} drag={isDragging} {...props}>Hello</NotesItem>
    );
}
