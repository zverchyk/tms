'use client'
import { link } from 'fs';
import styles from './controlPanel.module.scss'
import Link from 'next/link';
import { useState } from 'react';

export default function ControlPanel() {

    const cardsInfo = [
        { icon: '👤', title: 'Account Info', link: '/account' },
        { icon: '✉️', title: 'Messages', link: '/messages' },
        { icon: '🛠️', title: 'Equipment', link: '/equipment' },
        { icon: '⚙️', title: 'Settings', link: '/settings' },]
    const [cards, setCards] = useState(cardsInfo)

    return (
        <div className={styles.panelWrapper}>
            <h2>Control Panel</h2>
            <div className={styles.grid}>
                {cards.map((card, index) => (
                    <Link href={card.link} key={index}>
                        <div className={styles.card}>
                            <div className={styles.icon}>{card.icon}</div>
                            <span>{card.title}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}