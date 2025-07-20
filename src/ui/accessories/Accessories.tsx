'use client';

import styles from './accessories.module.scss';

export function ProgressBar({ progress }: { progress: number }) {
    return (
        <div className={styles.progressWindow}>
            {progress}/100
            <div className={styles.progressWrapper}>


                <div
                    className={styles.progressFill}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
}
