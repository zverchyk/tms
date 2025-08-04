'use client';

import { useState } from 'react';
import styles from './messages.module.scss';

export default function MessagesInput() {
  const [input, setInput] = useState('');

  // You can add logic to POST the message to an API here
  const sendMessage = () => {
    if (input.trim() === '') return;
    // TODO: send message to server
    setInput('');
  };

  return (
    <div className={styles.inputBar}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}