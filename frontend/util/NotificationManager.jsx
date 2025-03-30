// components/NotificationManager.js
import React, { useState } from 'react';
import Notification from '@/components/Notification';

const NotificationManager = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info') => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { message, type },
    ]);
  };

  const removeNotification = (index) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((_, i) => i !== index)
    );
  };

  return (
    <div>
      {notifications.map((notif, index) => (
        <div key={index}>
          <Notification
            message={notif.message}
            type={notif.type}
          />
          <button onClick={() => removeNotification(index)}>Dismiss</button>
        </div>
      ))}
      {/* Example: Button to add notification */}
      <button onClick={() => addNotification('This is a new notification', 'info')}>
        Show Info Notification
      </button>
    </div>
  );
};

export default NotificationManager;