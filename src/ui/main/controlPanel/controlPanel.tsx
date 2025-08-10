
// import { link } from 'fs';
import styles from './controlPanel.module.scss'
import Link from 'next/link';

type Card = { icon: string; title: string; link: string };
const cards: readonly Card[] = [
  { icon: '👤', title: 'Account Info', link: '/account' },
  { icon: '✉️', title: 'Messages',     link: '/messages' },
  { icon: '🛠️', title: 'Equipment',    link: '/equipment' },
  { icon: '⚙️', title: 'Settings',     link: '/settings' },
  { icon: '💵', title: 'Money',        link: '/money' },
] as const;
export default function ControlPanel() {

    return (
        <div className={styles.panelWrapper}>
            <h2>Control Panel</h2>
            <div className={styles.grid}>
            {cards.map((card) => (
                <Link href={card.link} key={card.link} className={styles.card}>
                <div className={styles.icon}>{card.icon}</div>
                <span>{card.title}</span>
                </Link>
                ))}
            </div>
        </div>
    );
}