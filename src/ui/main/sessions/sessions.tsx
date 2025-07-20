'use client';

import styles from './sessions.module.scss';
import { useState } from 'react';
import Link from 'next/link';

export default function Sessions() {

    const sessionsList = [
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

    const [sessions, setSessions] = useState(sessionsList)

    return (
        <div className={styles.main}>
            <header className={styles.header}>
                <div className={styles.icon}>🖋️</div>
                <h1>Sessions</h1>
            </header>

            <div className={styles.sessionBlock}>
                {sessions.map((session, i) => (
                    <div className="sessionElement" key={i}>
                        <Link href={`/session/${session.id}`} >
                            <div className={styles.sessionItem} >
                                <div className={styles.sessionIcon}>🖼️</div>
                                <div>
                                    <h3>{session.date}</h3>
                                    <p>• {session.status}</p>
                                    <p>• {session.pic}</p>
                                </div>
                            </div>
                        </Link>
                        <div className={styles.days_between}>
                            <h1>{session?.days ? `${session.days} days` : null}  </h1>
                            {Array.from({ length: Number(session.days) || 0 }).map((_, index) => (
                                <div key={index} className={styles.day_block}>

                                </div>
                            ))}
                        </div>
                    </div>
                )
                )
                }
            </div>

            <button className={styles.mainButton}>Main Page</button>
        </div>
    );
}
