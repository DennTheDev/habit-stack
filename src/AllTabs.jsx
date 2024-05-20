import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BoardII from "./BoardII";
import NotesII from './NotesII';
import Board from "./Board";
import Timer from './Timer';
const AllTabs = () => {
    return (
        <>
            <Tabs
                defaultValue="Notepad"
                className="w-[800px] bebas-neue-regular text-lg"
            >
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="Scrum Board">Scrum Board</TabsTrigger>
                    <TabsTrigger value="Notepad">NotePad</TabsTrigger>
                    <TabsTrigger value="Timer">Timer</TabsTrigger>
                </TabsList>
                <TabsContent value="Scrum Board">
                    <Board />
                </TabsContent>
                <TabsContent value={"Notepad"}>
                    <NotesII />
                </TabsContent>
                <TabsContent value={"Timer"}>
                    <><Timer/></>
                </TabsContent>
            </Tabs>
        </>
    );
};

export default AllTabs;
