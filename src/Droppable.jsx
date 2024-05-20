import {useState} from 'react';
import {useDroppable} from '@dnd-kit/core';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
export function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const [c,applyC]=useState(false);
  const style = {
    // color: isOver ? 'green' : undefined,
  };


  return (
      <Card className={"p-2 h-48 w-48 "+(isOver?" border-white":"border-0")} ref={setNodeRef} style={style}>
      {props.children}
      </Card>
  );
}