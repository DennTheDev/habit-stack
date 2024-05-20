import * as React from "react"
import {AvatarComp} from './AvatarComp'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Fire from './Fire'
import Love from './Love'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function Profile() {
  return (
    <Card className="w-72 h-fit">
      <CardHeader className={"gap-2"}>
        <AvatarComp className={"size-20"}/>
        <div className={"flex flex-row gap-2"}>
        <CardTitle className={"text-2xl"}>ShadCN</CardTitle>
        <Badge className={"text-xs h-5 mt-2"}>1550 <Fire/></Badge>
        </div>
      </CardHeader>
      <CardContent >
        <Card className="bg-gray-800 p-2">
        <div className="font-sans italic">"God created Arakis to train the faithful."</div>
        &mdash; Muad'dib, <cite>Dune</cite> 
        </Card>
      </CardContent >
      <CardFooter className="flex justify-between">
        {/* <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button> */}
        <Tabs defaultValue="stats" className="w-[400px] bebas-neue-regular text-lg">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>
          <TabsContent value="stats">
            <Card className={"p-3 h-40"}>
              <div>Max Streak : 1152</div>
              <div>Speed : Avg. 100 pages/day</div>
              <div>Books Read : 509</div>
              <div>Books Finished : 450</div>
              <div>Buddies : 25</div>
            </Card>
          </TabsContent>
          <TabsContent value="badges" >
            <Card className={"p-2 h-40 font-sans"}>
              <Badge className={"bg-red-600 hover:bg-red-800"}>Reading Frenzy</Badge>
              <Badge className={"bg-neutral-600 hover:bg-neutral-800"}>Mystery Maven</Badge>
              <Badge className={"bg-sky-400 hover:bg-sky-600"}>Dreamweaver</Badge>
              <Badge className={"bg-pink-500 hover:bg-pink-800"}>Cupid's Advocate</Badge>
              <Badge className={"bg-green-600 hover:bg-green-800"}>Committed</Badge>
              </Card>
          </TabsContent>
        </Tabs>
      </CardFooter>
    </Card>
  )
}
