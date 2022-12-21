import React, { useEffect, useState } from "react";
import EventEmitter from "../../lib/EventEmitter";

export interface Notification {
  message: string;
  type: "info" | "success" | "fail" | "letter";
  onClick?: any;
  duration?: number;
}

export const NotificationMessage = () => {
  const [showMessage, setShowMessage] = useState(false);

  const [notification, setNotification] = useState<Notification>(null);
  const [action, setAction] = useState(null);

  useEffect(() => {
    const notificationListener = EventEmitter.addListener(
      "notificationListener",
      onShowNotificationEvent
    );

    return () => {
      notificationListener.remove();
    };
  }, []);

  const onShowNotificationEvent = (notificationPayload: Notification) => {
    setNotification(notificationPayload);
    setShowMessage(true);
  };

  const hideNotification = () => {
    setShowMessage(false);
    setAction(null);
    setNotification(null);
  };

  return (
    <div
      className={`bg-[#153E90] translate-x duration-300 flex py-4 items-start text-white rounded-l-3xl w-96 ${
        showMessage ? " mr-0" : " -mr-96"
      } `}>
      <div className="w-16 text-80 animate-bounce -mt-10">
        {notification?.type == "success" && <span>🥳</span>}
        {notification?.type == "fail" && <span>😥</span>}
        {notification?.type == "letter" && <span>✉️</span>}
        {notification?.type == null ||
          (notification?.type == "info" && <span>😊</span>)}
      </div>
      <div
        className={`flex-1 ${notification?.onClick ? "cursor-pointer" : ""} `}
        onClick={() => {
          if (notification?.onClick) {
            notification.onClick();
            hideNotification();
          }
        }}>
        {notification?.message}
      </div>
      <button
        onClick={() => {
          hideNotification();
        }}
        className="px-5 ">
        <img src="/images/close-x.svg" className="align-top" />
      </button>
    </div>
  );
};
