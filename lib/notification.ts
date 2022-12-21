import { Notification } from "../components/Notifications/NotificationMessage";
import EventEmitter from "./EventEmitter";

export const showNotifications = (notificationPayload: Notification) => {
  EventEmitter.emit("notificationListener", notificationPayload);
};
