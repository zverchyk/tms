import { loadAllDialogs } from '@/lib/data';
import styles from './messages.module.scss';
import Link from 'next/link';

function formatMessengerDate(dateTime: string) {
  // Expects format: '28/05/2025#12:00:00'
  const [date, time] = dateTime.split('#');
  const [day, month, year] = date.split('/');
  const now = new Date();
  const msgDate = new Date(Number(year), Number(month) - 1, Number(day));
  const isToday =
    msgDate.getDate() === now.getDate() &&
    msgDate.getMonth() === now.getMonth() &&
    msgDate.getFullYear() === now.getFullYear();
  if (isToday) {
    return time.slice(0, 5); // HH:MM
  } else {
    return date;
  }
}

export default async function MessagesBlock() {
  const dialogs = await loadAllDialogs();

  return (
    <div className={styles.messagesWrapper}>
      <div className={styles.messagesList}>
        {dialogs.map((dialog) => (
          <Link href={`/messages/${dialog.id}`} key={dialog.id} className={styles.dialogLink}>
            <div className={styles.dialogItem}>
              <div className={styles.dialogIcon}>
                {/* Standard user icon (SVG) */}
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="#e0e0e0" />
                  <circle cx="16" cy="13" r="6" fill="#bdbdbd" />
                  <ellipse cx="16" cy="24" rx="9" ry="5" fill="#bdbdbd" />
                </svg>
              </div>
              <div className={styles.dialogContent}>
                <div className={styles.dialogHeader}>
                  <span className={styles.dialogName}>{dialog.name}</span>
                  <span className={styles.dialogTime}>{formatMessengerDate(dialog.lastMessageDateAndTime)}</span>
                </div>
                <div className={styles.dialogLastMessage}>{dialog.lastMessage}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}