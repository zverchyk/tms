'use client';

import { useState } from 'react';
import { DialogInfo } from '@/lib/definitions';
import styles from './userIcon.module.scss';

interface UserIconProps {
  user: DialogInfo;
}

export default function UserIcon({ user }: UserIconProps) {
  const [showPopup, setShowPopup] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'request': return '#ffcc00'; // Yellow
      case 'canceled': return '#ff4444'; // Red  
      case 'done': return '#00cc44'; // Green
      default: return '#cccccc';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'request': return 'Pending Request';
      case 'canceled': return 'Canceled';
      case 'done': return 'Completed';
      default: return 'Unknown';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className={styles.userIconContainer}>
      <div 
        className={styles.userIcon}
        style={{ borderColor: getStatusColor(user.status) }}
        onClick={() => setShowPopup(!showPopup)}
      >
        {getInitials(user.name)}
      </div>

      {showPopup && (
        <>
          <div className={styles.overlay} onClick={() => setShowPopup(false)} />
          <div className={styles.popup}>
            <div className={styles.popupHeader}>
              <div 
                className={styles.popupAvatar}
                style={{ borderColor: getStatusColor(user.status) }}
              >
                {getInitials(user.name)}
              </div>
              <div className={styles.popupNameStatus}>
                <h3>{user.name}</h3>
                <span 
                  className={styles.status}
                  style={{ color: getStatusColor(user.status) }}
                >
                  {getStatusText(user.status)}
                </span>
              </div>
            </div>
            
            <div className={styles.popupContent}>
              <div className={styles.infoRow}>
                <span className={styles.label}>📞 Phone:</span>
                <span className={styles.value}>{user.phone}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>📧 Email:</span>
                <span className={styles.value}>{user.email}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>📍 Location:</span>
                <span className={styles.value}>{user.location}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>📅 Client since:</span>
                <span className={styles.value}>{user.joinDate}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}