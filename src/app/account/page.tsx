import styles from './account.module.scss';

export default function Account() {
    return (
        <div className={styles.accountSummary}>
            <div className={styles.profileIcon}>👤</div>
            <h2>Name</h2>

            <div className={styles.statBlock}>
                <div className={styles.progressCircle}></div>
                <h3>Clients</h3>
                <p>Past 30 Days</p>
            </div>

            <div className={styles.statBlock}>
                <div className={styles.progressCircle}></div>
                <h3>Spending/Earning</h3>
                <p>Past 30 Days</p>
            </div>

            <div className={styles.statBlock}>
                <div className={styles.progressCircle}></div>
            </div>
        </div>
    );
}
