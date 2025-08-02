'use client'

// styles
import styles from './main.module.scss'
// elements
import Sessions from '@/ui/main/sessions/sessions';
import ControlPanel from '@/ui/main/controlPanel/controlPanel';
import Link from 'next/link';
import { useEffect, useState, useRef, Suspense } from 'react';








export default function Page() {

    // 
    const [visible, setIsVisible] = useState(false)
    // sections
    const middleRef = useRef<HTMLDivElement>(null);
    const topRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);




    const sections = [topRef, middleRef, bottomRef];
    const [currentIndex, setCurrentIndex] = useState(1); // Start at middle
    const [showReturn, setShowReturn] = useState(false);

    // BTN method
    const jumpToSection = (section: any, behavior: string) => {
        section.current?.scrollIntoView({ behavior: behavior });
        section === topRef ? setCurrentIndex(0) : setCurrentIndex(2)


    };

    // SCROLL WIPER


    // IT WAS LIKE THIS: const moveToSection = (section: React.RefObject<HTMLDivElement>, behavior: ScrollBehavior = 'smooth')
    // scroll method
    const moveToSection = (section: any, behavior: ScrollBehavior = 'smooth') => {
        section.current?.scrollIntoView({ behavior });
    };
    // need to put [] to make it work once. Show the middle section on page load
    useEffect(() => {
        moveToSection(middleRef, 'instant')
    }, [])

    // wheel scrolling handler
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            const section3Top = bottomRef.current?.offsetTop || 0;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (currentIndex === 2) {
                // Only jump to section 2 if scrolling up and window is at the very top of section 3
                if (e.deltaY < 0 && Math.abs(scrollTop - section3Top) < 2) {
                    setCurrentIndex(1);
                    e.preventDefault();
                    return;
                }
                // Otherwise, allow normal scrolling
                return;
            }

            if (currentIndex > 2) return;

            if (e.deltaY > 0 && currentIndex < sections.length - 1) {
                setCurrentIndex((prev) => prev + 1);
            } else if (e.deltaY < 0 && currentIndex > 0) {
                setCurrentIndex((prev) => prev - 1);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [currentIndex]);

    // first load handler
    useEffect(() => {

        moveToSection(sections[currentIndex]);


    }, [currentIndex]);

    // return to main section button analyzer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowReturn(!entry.isIntersecting);
            },
            { threshold: 0.4 }
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
            <button className={`${styles.returnToMainButton} ${showReturn ? styles.showReturnbtn : ''}`} onClick={() => jumpToSection(middleRef, 'smooth')} >^</button>

        </main>
    )
}


