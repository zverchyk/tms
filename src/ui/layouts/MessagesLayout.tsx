'use client';

import { usePathname } from "next/navigation";
import { loadAllDialogs } from "@/lib/data";
import { useEffect, useState } from "react";
import { DialogInfo } from "@/lib/definitions";
import styles from './messagesLayout.module.scss';
import { BackButton } from "../accessories/Accessories";
import UserIcon from "../messages/UserIcon";

interface MessagesLayoutProps {
  children: React.ReactNode;
}

export default function MessagesLayout({ children }: MessagesLayoutProps) {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<DialogInfo | null>(null);
  
  useEffect(() => {
    // Check if we're on a messages/[id] route
    const messageIdMatch = pathname.match(/\/messages\/(\w+)/);
    if (messageIdMatch) {
      const messageId = messageIdMatch[1];
      loadAllDialogs().then(dialogs => {
        const user = dialogs.find(dialog => dialog.id === messageId);
        setCurrentUser(user || null);
      });
    } else {
      setCurrentUser(null);
    }
  }, [pathname]);

  // const getTitle = () => {
  //   if (currentUser) {
  //     return currentUser.name;
  //   }
  //   return 'Messages';
  // };

  const isMessageDetail = pathname.match(/\/messages\/\w+/);

  return (
    <div className={styles.messagesLayout}>
      <header className={styles.messagesHeader}>
        <BackButton />
        <div className={styles.headerCenter}>
          {isMessageDetail && currentUser && (
            <div className={styles.userInfo}>
              <UserIcon user={currentUser} />
              <h1 className={styles.userName}>{currentUser.name}</h1>
            </div>
          )}
          {!isMessageDetail && <h1>Messages</h1>}
        </div>
        <div className={styles.headerRight}>
          {/* Space for future actions */}
        </div>
      </header>
      <main className={styles.messagesMain}>
        {children}
      </main>
    </div>
  );
}