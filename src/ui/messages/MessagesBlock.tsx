"use server"
import { loadAllDialogs } from "@/lib/data"

import Link from "next/link"
export  default async function MessagesBlock(){
     const data = await loadAllDialogs()
        
    return(
        <div>
  {data.map((dialog ,i)=>(
       <Link href={`/messages${dialog.id}`} key={i}>
        <div className="icon"></div>
        <div className="dialogInfo">
            <div className="dialogState">
                <div className="stateName">{dialog.name}</div>
                <div className="stateTime">{dialog.lastMessageDateAndTime}</div>
            </div>
            <div className="dialogLastMessage">{dialog.lastMessage}</div>
        </div>
       </Link>
  )

  )}
        </div>
    )
}