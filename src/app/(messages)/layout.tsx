import MessagesLayout from "@/ui/layouts/MessagesLayout";

export default function MessagesRouteLayout({ children }: { children: React.ReactNode }) {
  return <MessagesLayout>{children}</MessagesLayout>;
}