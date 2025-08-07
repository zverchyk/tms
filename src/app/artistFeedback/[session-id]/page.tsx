import ArtistFeedbackForm from "@/ui/artistFeedback/ArtistFeedbackForm";

export default async function ArtistFeedbackPage(props: { params: Promise<{ 'session-id': string }> }) {
  const params = await props.params;
  
  return (
    <ArtistFeedbackForm sessionId={params['session-id']} />
  );
}
