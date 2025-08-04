

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

function getStatusIcon(status: string): string {
    switch (status.toLowerCase()) {
        case 'completed': return '✅';
        case 'in progress': return '🔄';
        case 'scheduled': return '📅';
        case 'cancelled': return '❌';
        default: return '📝';
    }
}

function getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
        case 'completed': return 'statusCompleted';
        case 'in progress': return 'statusInProgress';
        case 'scheduled': return 'statusScheduled';
        case 'cancelled': return 'statusCancelled';
        default: return 'statusDefault';
    }
}

export default function Sessions() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [daysBetween, setdaysBetween] = useState<number[]>([0])
    const today = new Date().toLocaleDateString()

    // Count sessions by status
    const getStatusCounts = () => {
        const counts = {
            completed: 0,
            'in progress': 0,
            scheduled: 0,
            cancelled: 0
        };
        
        sessions.forEach(session => {
            const status = session.status.toLowerCase();
            if (status in counts) {
                counts[status as keyof typeof counts]++;
            }
        });
        
        return counts;
    };

    const statusCounts = getStatusCounts();



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
            <div className={styles.header}>
                <h2 className={styles.title}>Recent Sessions</h2>
                <div className={styles.sessionStats}>
                    <span className={styles.totalSessions}>{sessions.length} Sessions</span>
                    <div className={styles.statusIndicators}>
                        <div className={`${styles.statusIndicator} ${styles.completed}`}>
                            <span className={styles.statusIcon}>✅</span>
                            <span className={styles.statusCount}>{statusCounts.completed}</span>
                        </div>
                        <div className={`${styles.statusIndicator} ${styles.inProgress}`}>
                            <span className={styles.statusIcon}>🔄</span>
                            <span className={styles.statusCount}>{statusCounts['in progress']}</span>
                        </div>
                        <div className={`${styles.statusIndicator} ${styles.scheduled}`}>
                            <span className={styles.statusIcon}>📅</span>
                            <span className={styles.statusCount}>{statusCounts.scheduled}</span>
                        </div>
                        <div className={`${styles.statusIndicator} ${styles.cancelled}`}>
                            <span className={styles.statusIcon}>❌</span>
                            <span className={styles.statusCount}>{statusCounts.cancelled}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.sessionBlock}>
                {sessions.map((session, i) => (
                    <div key={session.id || i} className={styles.sessionGroup}>
                        {daysBetween[i] > 0 && (
                            <div className={styles.timeGap}>
                                <div className={styles.gapLine}></div>
                                <span className={styles.gapText}>{daysBetween[i]} days between</span>
                                <div className={styles.gapLine}></div>
                            </div>
                        )}
                        
                        <Link 
                            href={`/session/${session.id}`} 
                            className={`${styles.sessionItem} ${styles[getStatusClass(session.status)]} ${session.date === today ? styles.sessionItemToday : ''}`}
                        >
                            <div className={styles.sessionContent}>
                                <div className={styles.sessionImageContainer}>
                                    <Image 
                                        className={styles.sessionImage}
                                        src={session.pic}
                                        alt={`Session ${i + 1}`}
                                        width={60}
                                        height={60}
                                    />
                                    <div className={styles.statusOverlay}>
                                        <span className={styles.statusIcon}>{getStatusIcon(session.status)}</span>
                                    </div>
                                </div>
                                
                                <div className={styles.sessionInfo}>
                                    <div className={styles.sessionHeader}>
                                        <h4 className={styles.sessionTitle}>{session.id}</h4>
                                        <span className={styles.sessionStatus}>{session.status}</span>
                                    </div>
                                    <p className={styles.sessionDate}>{formatDate(session.date)}</p>
                                </div>
                            </div>
                            
                            <div className={styles.sessionAction}>
                                <span className={styles.chevron}>›</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
