import CpeLayout from "@/ui/layouts/categoryLayout";


export default function SessionLayout({ children }: { children: React.ReactNode }) {
    return (
        <CpeLayout title="Sessions">
            {children}
        </CpeLayout>
    )
}