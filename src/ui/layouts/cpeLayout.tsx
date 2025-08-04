import { Header } from "../accessories/Accessories";
import styles from './cpeLayout.module.scss';

interface CpeLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function CpeLayout({ children, title = 'Control Panel' }: CpeLayoutProps) {
  return (
    <div className={styles.cpeLayout}>
      <Header title={title} />
      <main>{children}</main>
    </div>
  );
}