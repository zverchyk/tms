import styles from './sessionSkeleton.module.scss';

export default function SessionSkeleton() {
  return (
    <div className={styles.sessionContainer}>
      <div className={styles.sessionCard}>
        
        {/* Header Skeleton */}
        <div className={styles.sessionHeader}>
          <div className={styles.imageContainer}>
            <div className={`${styles.skeleton} ${styles.sessionImageSkeleton}`}></div>
          </div>
          <div className={styles.headerInfo}>
            <div className={`${styles.skeleton} ${styles.sessionNameSkeleton}`}></div>
            <div className={`${styles.skeleton} ${styles.sessionDateSkeleton}`}></div>
          </div>
        </div>

        {/* Session Details Skeleton */}
        <div className={styles.sessionDetails}>
          <div className={styles.detailItem}>
            <div className={`${styles.skeleton} ${styles.detailLabelSkeleton}`}></div>
            <div className={`${styles.skeleton} ${styles.detailValueSkeleton}`}></div>
            <div className={`${styles.skeleton} ${styles.detailValueSkeleton} ${styles.short}`}></div>
          </div>
          
          <div className={styles.detailItem}>
            <div className={`${styles.skeleton} ${styles.detailLabelSkeleton}`}></div>
            <div className={`${styles.skeleton} ${styles.detailValueSkeleton} ${styles.medium}`}></div>
            <div className={`${styles.skeleton} ${styles.detailValueSkeleton} ${styles.long}`}></div>
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className={styles.actionButtons}>
          <div className={`${styles.skeleton} ${styles.actionButtonSkeleton}`}></div>
          <div className={`${styles.skeleton} ${styles.actionButtonSkeleton}`}></div>
          <div className={`${styles.skeleton} ${styles.actionButtonSkeleton}`}></div>
        </div>
      </div>
    </div>
  );
}