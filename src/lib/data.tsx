'use server'

import { EquipmentItem, Session, NewItem, DialogInfo} from '@/lib/definitions';


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

export async function loadAllDialogs():Promise<DialogInfo[]>{
    const data = [
  {
    id: "638387djdh",
    name: "jack",
    lastMessage: "yo",
    lastMessageDateAndTime: "28/05/2025#12:00:00",
  },
  {
    id: "8237xkdke1",
    name: "emma",
    lastMessage: "see you soon",
    lastMessageDateAndTime: "01/06/2025#09:30:00",
  },
  {
    id: "9283dkej39", 
    name: "liam",
    lastMessage: "call me",
    lastMessageDateAndTime: "15/06/2025#15:45:00",
  },
  {
    id: "3278djd92k",
    name: "olivia",
    lastMessage: "done!",
    lastMessageDateAndTime: "22/06/2025#10:00:00",
  },
  {
    id: "1223jdhq83",
    name: "noah",
    lastMessage: "thanks",
    lastMessageDateAndTime: "25/06/2025#18:20:00",
  },
  {
    id: "7362djfk82",
    name: "ava",
    lastMessage: "almost ready",
    lastMessageDateAndTime: "28/06/2025#11:10:00",
  },
  {
    id: "5283dhqk93",
    name: "william",
    lastMessage: "sent it",
    lastMessageDateAndTime: "01/07/2025#08:55:00",
  },
  {
    id: "3728djhd03",
    name: "sophia",
    lastMessage: "sure!",
    lastMessageDateAndTime: "04/07/2025#14:40:00",
  },
  {
    id: "9283dhdk29",
    name: "james",
    lastMessage: "ok",
    lastMessageDateAndTime: "07/07/2025#17:05:00",
  },
];
return data
}