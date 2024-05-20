import React,{useState} from 'react';
import { CaretSortIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {Card} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const Notes=()=>{
    const[content,setContent]=useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [editing,setEditingStatus]=useState(false);
    return(<>
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-[350px] space-y-2"
        >
            <CollapsibleTrigger asChild>
          <div className="rounded-sm border px-4 py-2 font-mono text-sm shadow-sm h-44 w-44"><Input className={'border-0'} type="text" placeholder="Note Title" />
          <CollapsibleContent>
                <Input type="text" placeholder="Note Content" />
          </CollapsibleContent>
          </div>
            </CollapsibleTrigger>
        </Collapsible>
    </>);
}
export default Notes;