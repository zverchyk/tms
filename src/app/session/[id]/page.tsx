'use client';
import Session from "@/ui/session/session";

export default function SessionPage(props: { params: { id: string } }) {
  return <Session id={props.params.id} />
}
