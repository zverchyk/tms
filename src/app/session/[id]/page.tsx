import Session from "@/ui/session/session";
import SessionSkeleton from "@/ui/session/SessionSkeleton";
import { Suspense } from "react";

export default async function SessionPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  
  return (
    <Suspense fallback={<SessionSkeleton />}>
      <Session id={params.id} />
    </Suspense>
  );
}
