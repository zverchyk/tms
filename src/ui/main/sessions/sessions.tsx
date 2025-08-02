

import styles from './sessions.module.scss';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchFakeSessions } from '@/lib/data'
import { Session } from '@/lib/definitions';
import Image from 'next/image';


function getDaysBetweenDates(date1: string, date2: string | number): number {
    if (date2 === 0) return 0;

    const d1 = new Date(date1);
    const d2 = new Date(date2);


    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}

function formatDate(input: string): string {
    const date = new Date(input.replace(/-/g, '/'));
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    const formatted = date.toLocaleDateString('en-US', options);
    return formatted
}
function sortByDateDescending<T extends { date: string }>(data: T[]): T[] {
    return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function checkLengthDaysBetween(input: number): number {
    return Math.min(input, 6);
}



export default function Sessions() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [daysBetween, setdaysBetween] = useState<number[]>([0])
    const today = new Date().toLocaleDateString()



    useEffect(() => {
        async function loadSessions() {
            const data = await fetchFakeSessions();

            const sortedData = sortByDateDescending([...data])
            setSessions(sortedData);
            let previousDate = '';
            const allDaysBetween: number[] = sortedData.map((session, i) => {
                const days = previousDate
                    ? getDaysBetweenDates(previousDate, session.date)
                    : 0;
                previousDate = session.date;
                return days;
            });
            setdaysBetween(allDaysBetween);

        }

        loadSessions();
    }, []);



    return (
        <div className={styles.main}>
            {/* today line */}


            <div className={styles.sessionBlock}>
                {sessions.map((session, i) => (
                    <div key={i}>
                        <div className={styles.days_between}>
                            <h1>{daysBetween[i] ? `${daysBetween[i]} days` : null}  </h1>
                            {
                                Array.from({ length: Number(checkLengthDaysBetween(daysBetween[i])) || 0 }).map((_, index) => (
                                    <div key={index} className={styles.day_block}>

                                    </div>
                                ))}


                        </div>
                        <Link href={`/session/${session.id}`} className={`${styles.sessionItem} ${session.date === today ? styles.sessionItemToday : ''}`}>

                            <div className={styles.sessionIconInfo}>
                                {/* <div className={styles.sessionIcon}>🖼️</div> */}
                                <Image className={styles.sessionIcon}
                                    src={session.pic}
                                    alt={`Image ${i}`}
                                    width={50}
                                    height={50}
                                ></Image>
                                <div className={styles.sessionInfoBlock}>
                                    <p>{session.status}</p>
                                </div>
                            </div>
                            <h3 className={styles.sessionDate}>{formatDate(session.date)}</h3>

                        </Link>

                    </div>
                )
                )
                }
            </div>


        </div>
    );
}
