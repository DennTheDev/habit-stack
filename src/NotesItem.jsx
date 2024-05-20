import React, { useState,forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TextareaAutosize } from 
"@mui/base/TextareaAutosize";
import ExpandIcon from './ExpandIcon'
import DragHandle from './DragHandle'
import CloseIcon from './CloseIcon'
export const NotesItem =forwardRef(({id,title,content,isOpen,expandHandler,contentChangeHandler,titleChangeHandler,deleteHandler,listeners,attributes,drag,...props},ref) => {
    return (
        <>
        <Card className="rounded-sm border px-4 py-2 font-mono text-sm shadow-sm min-h-18 h-auto w-64 space-y-2 " ref={ref} {...props}>
                <div className='grid grid-cols-6'>
                <Input
                    className={"border-0 col-span-3 "}
                    type="text"
                    onChange={(e)=>titleChangeHandler(e,id)}
                    placeholder="Note Title"
                    value={title}
                />
                    <div className={'w-4 pt-2 justify-self-end'} onClick={(e)=>expandHandler(e,id)}><ExpandIcon/></div>
                    <div className={'w-4 pt-2 justify-self-end'} onClick={(e)=>deleteHandler(e,id,props.column)}><CloseIcon/></div>
                    <div className={'w-4 pt-2 justify-self-end'} {...listeners} {...attributes}><DragHandle/></div>
                </div>
                <div>
                {isOpen && <TextareaAutosize
                    value={content}
                    onChange={(e)=>contentChangeHandler(e,id)}
                    className={"p-2 bg-slate-900 w-56 justify-left resize-none rounded-sm"}
                    aria-label="Demo input"
                    placeholder="Empty"
                  />
                }
                </div>
            </Card>
        </>
    );
});
