'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './dialogBlock.module.scss';

const initialMessages = [
  { id: 1, text: 'Hey! How are you?', sender: 'other', timestamp: new Date(Date.now() - 1000 * 60 * 10) },
  { id: 2, text: "I'm good, thanks! How about you?", sender: 'me', timestamp: new Date(Date.now() - 1000 * 60 * 8) },
  { id: 3, text: 'Doing well! Working on a new tattoo design.', sender: 'other', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
  { id: 4, text: 'That sounds amazing! Can you show me?', sender: 'me', timestamp: new Date(Date.now() - 1000 * 60 * 3) },
  { id: 5, text: 'Sure! Let me send some sketches', sender: 'other', timestamp: new Date(Date.now() - 1000 * 60 * 2) },
  { id: 6, text: 'Looking forward to it! 🚀', sender: 'me', timestamp: new Date(Date.now() - 1000 * 60 * 1) },
];

export default function DialogBlock({ id }: { id: string }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() === '') return;
    const newMessage = {
      id: Date.now(),
      text: input.trim(),
      sender: 'me' as const,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={styles.dialogContainer}>
      {/* Messages Area - Scrollable */}
      <div className={styles.messagesArea}>
        <div className={styles.messagesList}>
          {messages.map((msg, index) => {
            const showTime = index === 0 || 
              Math.abs(msg.timestamp.getTime() - messages[index - 1].timestamp.getTime()) > 5 * 60 * 1000;
            
            return (
              <div key={msg.id}>
                {showTime && (
                  <div className={styles.timestamp}>
                    {formatTime(msg.timestamp)}
                  </div>
                )}
                <div
                  className={`${styles.messageWrapper} ${
                    msg.sender === 'me' ? styles.myMessageWrapper : styles.otherMessageWrapper
                  }`}
                >
                  <div
                    className={`${styles.message} ${
                      msg.sender === 'me' ? styles.myMessage : styles.otherMessage
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Bar - Fixed */}
      <div className={styles.inputContainer}>
        <div className={styles.inputBar}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className={styles.messageInput}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className={styles.sendButton}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
