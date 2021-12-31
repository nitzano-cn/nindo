import Notification, {
	NotificationShow,
} from 'react-notification-system-redux';

export const success: NotificationShow = Notification.success;
export const info: NotificationShow = Notification.info;
export const warning: NotificationShow = Notification.warning;
export const error: NotificationShow = Notification.error;
export const hide = Notification.hide;
export const show = Notification.show;
export const removeAll = Notification.removeAll;
