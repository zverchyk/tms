import styles from './messagesSkeleton.module.scss';

export default function MessagesSkeleton() {
  return (
    <div className={styles.messagesWrapper}>
      <div className={styles.messagesList}>
        {/* Generate 8 skeleton dialog items */}
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className={styles.dialogItem}>
            <div className={styles.dialogIcon}>
              <div className={`${styles.skeleton} ${styles.iconSkeleton}`}></div>
            </div>
            <div className={styles.dialogContent}>
              <div className={styles.dialogHeader}>
                <div className={`${styles.skeleton} ${styles.dialogNameSkeleton}`}></div>
                <div className={`${styles.skeleton} ${styles.dialogTimeSkeleton}`}></div>
              </div>
              <div className={`${styles.skeleton} ${styles.dialogMessageSkeleton} ${
                index % 3 === 0 ? styles.short : index % 3 === 1 ? styles.medium : styles.long
              }`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}