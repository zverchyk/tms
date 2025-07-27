import Link from "next/link";
import styles from './accessories.module.scss'

export function BackButton({ href }: { href: string}) {
    return (
        <div>
            <Link href={href}>
                <button className={styles.backButton}>Back</button>
            </Link>
        </div>
    )
}

