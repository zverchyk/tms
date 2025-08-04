import DialogBlock from "@/ui/messages/DialogBlock";
import styles from './messagePage.module.scss';

export default async function MessagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return(
    <div className={styles.messagePageContainer}>
      <DialogBlock id={id} />
    </div>
  )
}