import TattooRequestForm from "@/ui/request/TattooRequestForm";

export default async function RequestPage(props: { params: Promise<{ 'user-name': string }> }) {
  const params = await props.params;
  
  return (
    <TattooRequestForm artistName={params['user-name']} />
  );
}
