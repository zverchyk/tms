import ClientFeedbackForm from "@/ui/clientFeedback/ClientFeedbackForm";

export default async function ClientFeedbackPage(props: { params: Promise<{ 'session-id': string }> }) {
  const params = await props.params;
  
  return (
    <ClientFeedbackForm sessionId={params['session-id']} />
  );
}
