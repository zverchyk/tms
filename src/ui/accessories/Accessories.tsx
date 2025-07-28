'use client';

import styles from './accessories.module.scss';

import { BackButton } from './buttons';

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

export function Header({title}: {title?:string}){
    return(
        <div>
        
            <BackButton href='/main'></BackButton>
            {title && <h1>{title}</h1>}
        </div>
    )
}