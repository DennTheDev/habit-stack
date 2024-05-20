import "./App.css";
import { Fragment } from "react";
import "../app/globals.css";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Comp } from "./Comp";
import Custom from "./Custom";
import { Profile } from "./Profile";
import { Dnd } from "./Dnd";
import Grid from "./Grid";
import { Excomp } from "./Excomp";
import AllTabs from "./AllTabs";
import Notes from "./Notes";
import NotesII from './NotesII';
export default function App() {
    return (
        <>
            <div className={"grid grid-cols-1 sm:grid-cols-6 p-2"}>
                <div className={"col-span-1 sm:col-span-2"}>
                    <Profile />
                </div>
                <div className={"col-span-1 sm:col-span-4"}>
                    <AllTabs />
                {/* <NotesII/> */}
                </div>
            </div>
        </>
    );
}
