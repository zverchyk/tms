'use client';

import Session from "@/ui/session/session";

export default function SessionPage(props: { params: Promise<{ id: string }> }) {
    const name = 'Jack Sparrow';
    const startDate = '29.10.2023';
    const notes = 'Needs detailed forearm sketch, session might extend.';
    const contactNumber = '+1 555-123-4567';
    const contactEmail = 'jack@example.com';

    return (
        <Session
            name={name}
            startDate={startDate}
            notes={notes}
            contactNumber={contactNumber}
            contactEmail={contactEmail}
        />
    );
}