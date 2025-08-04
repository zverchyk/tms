import CpeLayout from "@/ui/layouts/cpeLayout";

export default function MessagesListLayout({ children }: { children: React.ReactNode }) {
  return <CpeLayout title="Control Panel">{children}</CpeLayout>;
}