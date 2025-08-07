import SessionEdit from "@/ui/session/edit/edit";

export default async function EditPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  
  return <SessionEdit id={params.id} />
}
