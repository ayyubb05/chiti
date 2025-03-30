// components/Notification.js
import React from 'react';

const Notification = ({ message, type = 'info' }) => {
  const getNotificationClass = () => {
    switch (type) {
      case 'warning':
        return 'notification warning';
      case 'error':
        return 'notification error';
      default:
        return 'notification';
    }
  };

  return (
    <div className={getNotificationClass()}>
      <strong>{message}</strong>
    </div>
  );
};

export default Notification;