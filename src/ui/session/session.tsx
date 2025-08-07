import styles from './session.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { fetchSessionById } from '@/lib/data';

type Props = {
  id: string;
};

export default async function Session({ id }: Props) {
  const session = await fetchSessionById(id);

  if (!session) return <div>Session not found.</div>;

  return (
    <div className={styles.sessionContainer}>
      <div className={styles.sessionCard}>
        
        {/* Header with Image and Name */}
        <div className={styles.sessionHeader}>
          <div className={styles.imageContainer}>
            <Image
              src={session.pic}
              alt={session.name}
              width={80}
              height={80}
              className={styles.sessionImage}
            />
          </div>
          <div className={styles.headerInfo}>
            <h2 className={styles.sessionName}>{session.name}</h2>
            <span className={styles.sessionDate}>{session.startDate}</span>
          </div>
        </div>

        {/* Session Details */}
        <div className={styles.sessionDetails}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Notes</span>
            <p className={styles.detailValue}>{session.notes}</p>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Contact</span>
            <p className={styles.detailValue}>{session.contactNumber}</p>
            <p className={styles.detailValue}>{session.contactEmail}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <Link href='/timer' className={styles.buttonLink}>
            <button className={`${styles.actionButton} ${styles.primary}`}>
              Start Session
            </button>
          </Link>
          
          <Link href={`/session/${id}/edit`} className={styles.buttonLink}>
            <button className={`${styles.actionButton} ${styles.secondary}`}>
              Edit Details
            </button>
          </Link>
          
          <Link href='/main' className={styles.buttonLink}>
            <button className={`${styles.actionButton} ${styles.outline}`}>
              Back to Main
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
