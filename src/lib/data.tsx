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
            date: '3/12/2025',
            pic: '/tattoos/1.jpg',
            id: 'sess_01a9f2k1',
        },
        {
            status: 'in progress',
            date: '3/20/2025',
            pic: '/tattoos/2.webp',
            id: 'sess_02b7e1m4',
        },
        {
            status: 'scheduled',
            date: '4/1/2025',
            pic: '/tattoos/3.webp',
            id: 'sess_03c4r9h8',
        },
        {
            status: 'completed',
            date: '4/10/2025',
            pic: '/tattoos/4.jpg',
            id: 'sess_04d3n7z2',
        },
        {
            status: 'cancelled',
            date: '4/18/2025',
            pic: '/tattoos/5.avif',
            id: 'sess_05e6w8k0',
        },
        {
            status: 'completed',
            date: '5/3/2025',
            pic: '/tattoos/6.png',
            id: 'sess_06f1x3v5',
        },
        {
            status: 'in progress',
            date: '7/28/2025',
            pic: '/tattoos/7.avif',
            id: 'sess_07g9y2j6',
        },
        {
            status: 'scheduled',
            date: '7/27/2025',
            pic: '/tattoos/8.jpg',
            id: 'sess_08h0z7l9',
        },
    ];

    return sessions;
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