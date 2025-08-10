// app/messages/[id]/DialogBlockClient.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './dialogBlock.module.scss';
import { MessageInfo } from '@/lib/definitions';

export default function DialogBlockClient({ initialMessages }: { initialMessages: MessageInfo[] }) {
  const [messages, setMessages] = useState<MessageInfo[]>(initialMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const newMessage: MessageInfo = {
      id: Date.now(),
      text,
      sender: 'me',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (ts: Date) =>
    new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={styles.dialogContainer}>
      <div className={styles.messagesArea}>
        <div className={styles.messagesList}>
          {messages.map((msg, i) => {
            const prev = messages[i - 1];
            const showTime = i === 0 || Math.abs(+msg.timestamp - +(prev?.timestamp ?? 0)) > 5 * 60 * 1000;
            return (
              <div key={msg.id}>
                {showTime && <div className={styles.timestamp}>{formatTime(msg.timestamp)}</div>}
                <div className={`${styles.messageWrapper} ${msg.sender === 'me' ? styles.myMessageWrapper : styles.otherMessageWrapper}`}>
                  <div className={`${styles.message} ${msg.sender === 'me' ? styles.myMessage : styles.otherMessage}`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className={styles.inputContainer}>
        <div className={styles.inputBar}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className={styles.messageInput}
          />
          <button onClick={sendMessage} disabled={!input.trim()} className={styles.sendButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
