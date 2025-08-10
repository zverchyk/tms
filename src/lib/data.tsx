'use server'

import { EquipmentItem, Session, DialogInfo, SessionData, MessageInfo } from '@/lib/definitions';


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
      id: 'a1b2c3d4e5f6g7h',
    },
    {
      status: 'in progress',
      date: '3/20/2025',
      pic: '/tattoos/2.webp',
      id: 'z9y8x7w6v5u4t3s',
    },
    {
      status: 'scheduled',
      date: '4/1/2025',
      pic: '/tattoos/3.webp',
      id: 'm1n2b3v4c5x6z7a',
    },
    {
      status: 'completed',
      date: '4/10/2025',
      pic: '/tattoos/4.jpg',
      id: 'r8e7t6y5u4i3o2p',
    },
    {
      status: 'cancelled',
      date: '4/18/2025',
      pic: '/tattoos/5.avif',
      id: 'q1w2e3r4t5y6u7i',
    },
    {
      status: 'completed',
      date: '5/3/2025',
      pic: '/tattoos/6.png',
      id: 'k9j8h7g6f5d4s3a',
    },
    {
      status: 'in progress',
      date: '7/28/2025',
      pic: '/tattoos/7.avif',
      id: 'l0k9j8h7g6f5d4s',
    },
    {
      status: 'scheduled',
      date: '7/27/2025',
      pic: '/tattoos/8.jpg',
      id: 'v1b2n3m4c5x6z7l',
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
    status: 'request' as const,
    phone: "+1 (555) 123-4567",
    email: "jack.smith@email.com",
    location: "New York, NY",
    joinDate: "March 2024",
  },
  {
    id: "8237xkdke1",
    name: "emma",
    lastMessage: "see you soon",
    lastMessageDateAndTime: "01/06/2025#09:30:00",
    status: 'done' as const,
    phone: "+1 (555) 234-5678",
    email: "emma.jones@email.com",
    location: "Los Angeles, CA",
    joinDate: "January 2024",
  },
  {
    id: "9283dkej39", 
    name: "liam",
    lastMessage: "call me",
    lastMessageDateAndTime: "15/06/2025#15:45:00",
    status: 'canceled' as const,
    phone: "+1 (555) 345-6789",
    email: "liam.brown@email.com",
    location: "Chicago, IL",
    joinDate: "February 2024",
  },
  {
    id: "3278djd92k",
    name: "olivia",
    lastMessage: "done!",
    lastMessageDateAndTime: "22/06/2025#10:00:00",
    status: 'done' as const,
    phone: "+1 (555) 456-7890",
    email: "olivia.davis@email.com",
    location: "Miami, FL",
    joinDate: "December 2023",
  },
  {
    id: "1223jdhq83",
    name: "noah",
    lastMessage: "thanks",
    lastMessageDateAndTime: "25/06/2025#18:20:00",
    status: 'done' as const,
    phone: "+1 (555) 567-8901",
    email: "noah.wilson@email.com",
    location: "Seattle, WA",
    joinDate: "April 2024",
  },
  {
    id: "7362djfk82",
    name: "ava",
    lastMessage: "almost ready",
    lastMessageDateAndTime: "28/06/2025#11:10:00",
    status: 'request' as const,
    phone: "+1 (555) 678-9012",
    email: "ava.miller@email.com",
    location: "Austin, TX",
    joinDate: "May 2024",
  },
  {
    id: "5283dhqk93",
    name: "william",
    lastMessage: "sent it",
    lastMessageDateAndTime: "01/07/2025#08:55:00",
    status: 'request' as const,
    phone: "+1 (555) 789-0123",
    email: "william.garcia@email.com",
    location: "Denver, CO",
    joinDate: "June 2024",
  },
  {
    id: "3728djhd03",
    name: "sophia",
    lastMessage: "sure!",
    lastMessageDateAndTime: "04/07/2025#14:40:00",
    status: 'done' as const,
    phone: "+1 (555) 890-1234",
    email: "sophia.martinez@email.com",
    location: "Portland, OR",
    joinDate: "March 2024",
  },
  {
    id: "9283dhdk29",
    name: "james",
    lastMessage: "ok",
    lastMessageDateAndTime: "07/07/2025#17:05:00",
    status: 'canceled' as const,
    phone: "+1 (555) 901-2345",
    email: "james.rodriguez@email.com",
    location: "Boston, MA",
    joinDate: "January 2024",
  },
];
const waitedData = await wait(1000).then(()=>data)
return waitedData
}

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Waited ${ms}ms`);
    }, ms);
  });
}

export async function fetchSessionById(id: string): Promise<SessionData | undefined> {
  const fakeSessions: SessionData[] = [
    {
      id: "a1b2c3d4e5f6g7h",
      name: "Alice Johnson",
      startDate: "2024-06-01",
      notes: "First tattoo session. Prefers black ink.",
      contactNumber: "+1 (555) 123-4567",
      contactEmail: "alice.johnson@email.com",
      pic: "/tattoos/1.jpg",
    },
    {
      id: "z9y8x7w6v5u4t3s",
      name: "Bob Smith",
      startDate: "2024-06-03",
      notes: "Cover-up work. Allergic to latex.",
      contactNumber: "+1 (555) 234-5678",
      contactEmail: "bob.smith@email.com",
      pic: "/tattoos/2.webp",
    },
    {
      id: "m1n2b3v4c5x6z7a",
      name: "Charlie Lee",
      startDate: "2024-06-05",
      notes: "Wants a dragon design on forearm.",
      contactNumber: "+1 (555) 345-6789",
      contactEmail: "charlie.lee@email.com",
      pic: "/tattoos/3.webp",
    },
    {
      id: "r8e7t6y5u4i3o2p",
      name: "Diana Prince",
      startDate: "2024-06-07",
      notes: "Returning client. Minimalist style.",
      contactNumber: "+1 (555) 456-7890",
      contactEmail: "diana.prince@email.com",
      pic: "/tattoos/4.jpg",
    },
    {
      id: "q1w2e3r4t5y6u7i",
      name: "Ethan Hunt",
      startDate: "2024-06-09",
      notes: "Large back piece. Needs numbing cream.",
      contactNumber: "+1 (555) 567-8901",
      contactEmail: "ethan.hunt@email.com",
      pic: "/tattoos/5.avif",
    },
    {
      id: "k9j8h7g6f5d4s3a",
      name: "Fiona Gallagher",
      startDate: "2024-06-11",
      notes: "Small wrist tattoo. Walk-in appointment.",
      contactNumber: "+1 (555) 678-9012",
      contactEmail: "fiona.gallagher@email.com",
      pic: "/tattoos/6.png",
    },
    {
      id: "l0k9j8h7g6f5d4s",
      name: "George Miller",
      startDate: "2024-06-13",
      notes: "Consultation for sleeve. Likes color.",
      contactNumber: "+1 (555) 789-0123",
      contactEmail: "george.miller@email.com",
      pic: "/tattoos/7.avif",
    },
    {
      id: "v1b2n3m4c5x6z7l",
      name: "Hannah Brown",
      startDate: "2024-06-15",
      notes: "Touch-up session. Sensitive skin.",
      contactNumber: "+1 (555) 890-1234",
      contactEmail: "hannah.brown@email.com",
      pic: "/tattoos/8.jpg",
    }
  ];

  const data = await wait(1000).then(() => fakeSessions);
  return data.find(session => session.id === id);
}



export async function fetchFakeMessages(id:string):Promise<MessageInfo[]>{
  if(id === undefined) return []
  const initialMessages:MessageInfo[] = [
    { id: 1, text: 'Hey! How are you?', sender: 'other', timestamp: new Date(Date.now() - 1000 * 60 * 10) },
    { id: 2, text: "I'm good, thanks! How about you?", sender: 'me', timestamp: new Date(Date.now() - 1000 * 60 * 8) },
    { id: 3, text: 'Doing well! Working on a new tattoo design.', sender: 'other', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
    { id: 4, text: 'That sounds amazing! Can you show me?', sender: 'me', timestamp: new Date(Date.now() - 1000 * 60 * 3) },
    { id: 5, text: 'Sure! Let me send some sketches', sender: 'other', timestamp: new Date(Date.now() - 1000 * 60 * 2) },
    { id: 6, text: 'Looking forward to it! 🚀', sender: 'me', timestamp: new Date(Date.now() - 1000 * 60 * 1) },
  ];
  
  const data = await wait(1000).then(() => initialMessages);
  return data
}
