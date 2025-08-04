'use client';
import SessionEdit from "@/ui/session/edit/edit";

export default function EditPage(props: { params: { id: string } }) {
  return <SessionEdit id={props.params.id} />
}
