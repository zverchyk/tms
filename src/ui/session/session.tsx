

import styles from './session.module.scss';
import Link from 'next/link';

export default function Session({ name, startDate, notes, contactNumber, contactEmail }:
    {
        name: string, startDate: string, notes: string, contactNumber: string, contactEmail: string

    }) {

    return (
        <div className={styles.card}>
            <div className={styles.imagePlaceholder}></div>

            <div className={styles.content}>
                <div className={styles.header}>
                    <h3>{name}</h3>
                </div>

                <p className={styles.subtext}>Watch</p>

                <div className={styles.section}>
                    <h4>Start Date</h4>
                    <p>{startDate}</p>
                </div>

                <div className={styles.section}>
                    <h4>Notes</h4>
                    <p>{notes}</p>
                </div>
                <div className={styles.section}>
                    <h4>Contact</h4>
                    <p>{contactNumber}</p>
                    <p>{contactEmail}</p>
                </div>
                <Link href='/timer'>
                    <button className={styles.startButton}>Start Now</button>
                </Link>

                <Link href='/main'>
                    <button className={styles.menuButton}>Back to main</button>
                </Link>
            </div>
        </div>
    );
}
