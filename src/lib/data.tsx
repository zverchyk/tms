'use server'

import { EquipmentItem, Session, NewItem } from '@/lib/definitions';


const equipment = [
    {
        name: 'FK Irons Flux',
        category: 'Machine',
        date: '2023-10-01',
        notes: 'Main wireless machine',
        cost: 255
    },
    {
        name: 'Critical Atom X',
        category: 'Power Supply',
        date: '2022-06-14',
        notes: 'Used with backup machine',
        cost: 23
    },
    {
        name: 'Cheyenne 5RL',
        category: 'Needle Type',
        date: '',
        cost: 330,
        quantity: 10
    },
]
export async function fetchFakeEquipment(): Promise<EquipmentItem[]> {

    return equipment

}

export async function fetchFakeSessions(): Promise<Session[]> {
    const sessions = [
        {
            status: 'completed',
            date: '2025-03-12',
            pic: '/images/session1.jpg',
            id: 'sess_01a9f2k1',

        },
        {
            status: 'in progress',
            date: '2025-03-20',
            pic: '/images/session2.jpg',
            id: 'sess_02b7e1m4',
        },
        {
            status: 'scheduled',
            date: '2025-04-01',
            pic: '/images/session3.jpg',
            id: 'sess_03c4r9h8',
        },
        {
            status: 'completed',
            date: '2025-04-10',
            pic: '/images/session4.jpg',
            id: 'sess_04d3n7z2',

        },
        {
            status: 'cancelled',
            date: '2025-04-18',
            pic: '/images/session5.jpg',
            id: 'sess_05e6w8k0',
        },
        {
            status: 'completed',
            date: '2025-05-03',
            pic: '/images/session6.jpg',
            id: 'sess_06f1x3v5',

        },
        {
            status: 'in progress',
            date: '2025-05-11',
            pic: '/images/session7.jpg',
            id: 'sess_07g9y2j6',
        },
        {
            status: 'scheduled',
            date: '2025-05-19',
            pic: '/images/session8.jpg',
            id: 'sess_08h0z7l9',
        },
    ];

    return sessions


}

type State = {
    message: string | null;
    errors?: { [key: string]: string[] };
};

export async function uploadNewItem(prevState: State, formData: FormData): Promise<State> {
    const name = formData.get('name')?.toString();
    const cost = formData.get('cost')?.toString();

    if (!name || !cost) {
        return { message: null, errors: { name: ['Name and cost required'] } };
    }

    // Simulate DB
    console.log('Saving item:', { name, cost });



    return { message: 'Item added successfully' };


}