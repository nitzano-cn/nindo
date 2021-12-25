import { Dispatch } from 'react';
import NotificationSystem from 'react-notification-system';

import { success, error, info, warning, removeAll, hide, show } from '../../internal/actions/appNotifications.actions';

class NotificationHelper {
	public dispatch: null | Dispatch<any> = null;

  public success(config: NotificationSystem.Notification) {
    this.dispatch?.(success(config));
  }

  public error(config: NotificationSystem.Notification) {
    this.dispatch?.(error(config));
  }

  public warning(config: NotificationSystem.Notification) {
    this.dispatch?.(warning(config));
  }

  public info(config: NotificationSystem.Notification) {
    this.dispatch?.(info(config));
  }

  public show(config: NotificationSystem.Notification) {
    this.dispatch?.(show(config));
  }

  public hide(uid: string | number) {
    this.dispatch?.(hide({ uid }));
  }

  public removeAll() {
    this.dispatch?.(removeAll());
  }
}

export const notificationHelper = new NotificationHelper();