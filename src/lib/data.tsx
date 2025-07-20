

type Props = {
    query: string;
}

export default function fetchFakeData(query: string) {
    let data
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
    const sessions = [
        {
            status: 'done',
            date: '23.03.2025',
            pic: 'smth',
            id: 'jsadfaiopjfojinsnapwaffasdf',
            days: 3

        },
        {
            status: 'done',
            date: '23.03.2025',
            pic: 'smth',
            id: 'jsadfaiopjfojinsnapwaffasdfdfsf'
        },
        {
            status: 'done',
            date: '23.03.2025',
            pic: 'smth',
            id: 'jsadfaiopjfsnapwaffasdf'
        },
        {
            status: 'done',
            date: '23.03.2025',
            pic: 'smth',
            days: 10
        },
        {
            status: 'done',
            date: '23.03.2025',
            pic: 'smth'
        },
        {
            status: 'done',
            date: '23.03.2025',
            pic: 'smth',
            days: 5
        },
        {
            status: 'done',
            date: '23.03.2025',
            pic: 'smth'
        },
        {
            status: 'done',
            date: '23.03.2025',
            pic: 'smth'
        },
    ]

    query === 'equipment' ? data = equipment : data = sessions
    return data
}