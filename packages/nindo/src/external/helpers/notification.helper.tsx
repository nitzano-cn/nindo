import React from 'react';
import { toast } from 'react-toastify';

import { getAppNotificationElm } from '../../internal/components/appNotifications/appNotifications.comp';
import { IAppNotification } from '../types/appNotification.types';

function getToastContent(config: IAppNotification) {
	if (!config.message && !config.title) {
		return config.title;
	}
	
	const Elm = getAppNotificationElm(config.title as string, config.message as string, config.children);
	return <Elm />;
}

class NotificationHelper {
	public success(config: IAppNotification) {
		toast.success(getToastContent(config), {
			autoClose: typeof config.autoDismiss === 'number' ? config.autoDismiss * 1000 : false,
			closeButton: !!config.autoDismiss,
			closeOnClick: !!config.autoDismiss,
			toastId: config.uid,
		});
	}

	public error(config: IAppNotification) {
		toast.error(getToastContent(config), {
			autoClose: typeof config.autoDismiss === 'number' ? config.autoDismiss * 1000 : false,
			closeButton: !!config.autoDismiss,
			closeOnClick: !!config.autoDismiss,
			toastId: config.uid,
		});
	}

	public warning(config: IAppNotification) {
		toast.warning(getToastContent(config), {
			autoClose: typeof config.autoDismiss === 'number' ? config.autoDismiss * 1000 : false,
			closeButton: !!config.autoDismiss,
			closeOnClick: !!config.autoDismiss,
			toastId: config.uid,
		});
	}

	public info(config: IAppNotification) {
		toast.info(getToastContent(config), {
			autoClose: typeof config.autoDismiss === 'number' ? config.autoDismiss * 1000 : false,
			closeButton: !!config.autoDismiss,
			closeOnClick: !!config.autoDismiss,
			toastId: config.uid,
		});
	}

	public show(config: IAppNotification) {
		toast(getToastContent(config), {
			autoClose: typeof config.autoDismiss === 'number' ? config.autoDismiss * 1000 : false,
			closeButton: !!config.autoDismiss,
			closeOnClick: !!config.autoDismiss,
			toastId: config.uid,
		});
	}

	public hide(uid: string | number) {
		toast.dismiss(uid);
	}

	public removeAll() {
		toast.dismiss();
	}
}

export const notificationHelper = new NotificationHelper();
