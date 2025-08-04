'use client';

import styles from './accessories.module.scss';

import Link from "next/link";
import { useRouter } from 'next/navigation'; // or 'next/navigation' if using App Router



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

export function Header({title= 'Control Panel' }: {title:string }){
    return(
        <div className={styles.cpeHeader}>
  
            {title == "Control Panel" ? <MainMenuButton></MainMenuButton>: <BackButton></BackButton>}
            {title && <h1>{title}</h1>}
        </div>
    )
}
export function MainMenuButton() {
    const router = useRouter();
    return (
        <button className={styles.backButton} onClick={() => router.push('/main')}>
            ‹
        </button>
    )
}


export function BackButton() {
    const router = useRouter();
    return (
        <button className={styles.backButton} onClick={() => router.back()}>
            ‹
        </button>
    )
}

interface Breadcrumb {
    label: string;
    href: string;
  }
  
export default function Breadcrumbs({
    breadcrumbs,
  }: {
    breadcrumbs: Breadcrumb;
  }) {
    return (
            <Link href={breadcrumbs.href} className=''>{breadcrumbs.label}</Link>
       
      
    );
  }
  