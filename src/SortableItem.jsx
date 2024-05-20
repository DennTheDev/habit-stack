import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { Item } from "./Item";
export function SortableItem(props) {
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
        <>
        <Item ref={setNodeRef} style={style} {...attributes} {...listeners} activeId={props.activeId} drag={isDragging}>
            {!isDragging && props.id}
        </Item>
        </>
    );
}
