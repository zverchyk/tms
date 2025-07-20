import Image from "next/image";
import styles from "./page.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.home_page}>
      <Link href="/main" className={styles.main_btn}>GO to main</Link>


    </div>
  )
}
