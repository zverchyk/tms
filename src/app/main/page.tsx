'use client'

// styles
import styles from './main.module.scss'
// elements
import Sessions from '@/ui/main/sessions/sessions';
import ControlPanel from '@/ui/main/controlPanel/controlPanel';
import Link from 'next/link';
import { useEffect, useState, useRef, Suspense, useMemo } from 'react';





export default function Page() {


    // sections
    const middleRef = useRef<HTMLDivElement | null>(null);
    const topRef = useRef<HTMLDivElement | null>(null);
    const bottomRef = useRef<HTMLDivElement | null>(null);




    const sections = useMemo(() => [topRef, middleRef, bottomRef], []);
    const [currentIndex, setCurrentIndex] = useState(1); // Start at middle
    const [showReturn, setShowReturn] = useState(false);
    const [arrowUp, setArrowUp] = useState(true);

    // BTN method
    const jumpToSection = (
        section: React.RefObject<HTMLDivElement | null>,
        behavior: ScrollBehavior
    ) => {
        if (!section || !section.current) return;
        section.current.scrollIntoView({ behavior });
        if (section === topRef) setCurrentIndex(0);
        else if (section === middleRef) setCurrentIndex(1);
        else if (section === bottomRef) setCurrentIndex(2);
    };


    // SCROLL WIPER
    // IT WAS LIKE THIS: const moveToSection = (section: React.RefObject<HTMLDivElement>, behavior: ScrollBehavior = 'smooth')
    // scroll method
    const moveToSection = (section: React.RefObject<HTMLDivElement | null>, behavior: ScrollBehavior = 'smooth') => {
        if (!section || !section.current) return;
        section.current.scrollIntoView({ behavior });
    };

    // need to put [] to make it work once. Show the middle section on page load
    useEffect(() => {
        moveToSection(middleRef, 'instant')
    }, [])

    // wheel scrolling handler
    // useEffect(() => {
    //     const handleWheel = (e: WheelEvent) => {
    //         // Eliminate wheel events outside threshold 0 < x < 2
    //         if (Math.abs(e.deltaY) < 0.1 || Math.abs(e.deltaY) > 200) {
    //             return; // Ignore very small or very large wheel events
    //         }

    //         const section3Top = bottomRef.current?.offsetTop || 0;
    //         const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    //         if (currentIndex >= sections.length || currentIndex <= 0) {
    //             setCurrentIndex(1);
    //             e.preventDefault();
    //             return;
    //         }
    //         if (currentIndex === 2) {
    //             // Only jump to section 2 if scrolling up and window is at the very top of section 3
    //             if (e.deltaY < 0 && Math.abs(scrollTop - section3Top) < 2) {
    //                 setCurrentIndex(1);
    //                 e.preventDefault();
    //                 return;
    //             }
    //             // Otherwise, allow normal scrolling
    //             return;
    //         }

    //         if (currentIndex > 2) return;

    //         if (e.deltaY > 0 && currentIndex < sections.length - 1) {
    //             setCurrentIndex((prev) => prev + 1);
    //         } else if (e.deltaY < 0 && currentIndex > 0) {
    //             setCurrentIndex((prev) => prev - 1);
    //         }
    //     };

    //     window.addEventListener('wheel', handleWheel, { passive: false });
    //     return () => window.removeEventListener('wheel', handleWheel);
    // }, [currentIndex]);

    // first load handler
    useEffect(() => {
        moveToSection(sections[currentIndex]);
    }, [currentIndex, sections]);

    // return to main section button analyzer
    useEffect(() => {
        const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);
        const observer = new IntersectionObserver(
            ([entry]) => {
                const ratio = entry.intersectionRatio || 0;
                // Show when at least 40% of the main section is off-screen (i.e., < 60% visible)
                setShowReturn(ratio < 0.6);

                // Determine arrow direction based on section center vs viewport center
                const rect = entry.boundingClientRect;
                const root = entry.rootBounds;
                const viewportTop = root ? root.top : 0;
                const viewportBottom = root ? root.bottom : window.innerHeight;
                const viewportCenter = (viewportTop + viewportBottom) / 2;
                const sectionCenter = rect.top + rect.height / 2;
                // If section center is above viewport center, user is below -> arrow up; else arrow down
                setArrowUp(sectionCenter < viewportCenter);
            },
            { threshold: thresholds }
        );

        if (middleRef.current) {
            observer.observe(middleRef.current);
        }
        return () => {
            if (middleRef.current) {
                observer.unobserve(middleRef.current);
            }
        };
    }, []);

    return (
        <main className={styles.mainWrapper}>
            <Suspense>
                <section className={styles.section} ref={topRef}>
                    <ControlPanel></ControlPanel>
                </section>
            </Suspense>
            <section className={`${styles.mainPage} ${styles.section}`} ref={middleRef} >
                <button className={`${styles.halfRoundedButton} ${styles.controlPanelBtn}`} onClick={() => jumpToSection(topRef, 'smooth')}>Control Panel</button>

                <Link href='/session/create' className={styles.addSessionBtn}>
                    <p className={styles.icon}>+</p>
                    <p className={styles.label}>Add <br /> Session</p>
                </Link>

                <button className={`${styles.halfRoundedButton} ${styles.sessionsBtn}`} onClick={() => jumpToSection(bottomRef, 'smooth')}>Sessions</button>
            </section>
            <section className={styles.section} ref={bottomRef}>
                <Sessions></Sessions>
            </section>
            <button className={`${styles.returnToMainButton} ${showReturn ? styles.showReturnbtn : ''}`} onClick={() => jumpToSection(middleRef, 'smooth')} >{arrowUp ? '⬆' : '⬇'}</button>

        </main>
    )
}


