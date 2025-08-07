import MessagesBlock from "@/ui/messages/MessagesBlock";
import MessagesSkeleton from "@/ui/messages/MessagesSkeleton";
import { Suspense } from "react";

export default function MessagesPage(){
    return(
        <Suspense fallback={<MessagesSkeleton />}>
            <MessagesBlock></MessagesBlock>
        </Suspense>
    )
}