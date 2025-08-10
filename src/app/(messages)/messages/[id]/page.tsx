import DialogBlock from "@/ui/messages/DialogBlock";
import styles from './messagePage.module.scss';
import { fetchFakeMessages } from '@/lib/data';
import { MessageInfo } from '@/lib/definitions';


export default async function MessagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const initialMessages: MessageInfo[] = await fetchFakeMessages(id); 
  
  return(
    <div className={styles.messagePageContainer}>
      <DialogBlock initialMessages={initialMessages}/>
    </div>
  )
}



