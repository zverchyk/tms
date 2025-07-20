'use client';

import { useEffect, useState } from 'react';
import styles from './timer.module.scss';

export default function Timer() {
    const [pauseTime, setPauseTime] = useState(0);
    const [sessionTime, setSessionTime] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    // Pause Timer (Inner Circle)
    useEffect(() => {
        if (!isRunning) return;
        const interval = setInterval(() => {
            setPauseTime((prev) => prev + 1);
            setSessionTime((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [isRunning]);

    const formatTime = (seconds: number) => {
        const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    return (
        <div className={styles.timerWrapper}>
            <div className={styles.stopwatch}>
                <span>{formatTime(pauseTime)}</span>
            </div>

            <div className={styles.sessionTime}>
                <p>SESSION TIME</p>
                <h2>{formatTime(sessionTime)}</h2>
            </div>
            <div className="btns">
                <button className={styles.stopButton} onClick={() => setIsRunning(false)}>
                    STOP
                </button>
                <button className={styles.stopButton} onClick={() => setIsRunning(false)}>
                    RESUME
                </button>
                <button className={styles.stopButton} onClick={() => setIsRunning(false)}>
                    FINISH
                </button>
            </div>

        </div>
    );
}
