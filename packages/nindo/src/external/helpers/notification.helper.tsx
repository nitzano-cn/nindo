import React from 'react';
import { Dispatch } from 'react';
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
	public dispatch: null | Dispatch<any> = null;

	public success(config: IAppNotification) {
		toast.success(getToastContent(config), {
			autoClose: config.autoDismiss,
			closeButton: !!config.dismissible,
			closeOnClick: !!config.dismissible,
			toastId: config.uid,
		});
	}

	public error(config: IAppNotification) {
		toast.error(getToastContent(config), {
			autoClose: config.autoDismiss,
			closeButton: !!config.dismissible,
			closeOnClick: !!config.dismissible,
			toastId: config.uid,
		});
	}

	public warning(config: IAppNotification) {
		toast.warning(getToastContent(config), {
			autoClose: config.autoDismiss,
			closeButton: !!config.dismissible,
			closeOnClick: !!config.dismissible,
			toastId: config.uid,
		});
	}

	public info(config: IAppNotification) {
		toast.info(getToastContent(config), {
			autoClose: config.autoDismiss,
			closeButton: !!config.dismissible,
			closeOnClick: !!config.dismissible,
			toastId: config.uid,
		});
	}

	public show(config: IAppNotification) {
		toast(getToastContent(config), {
			autoClose: config.autoDismiss,
			closeButton: !!config.dismissible,
			closeOnClick: !!config.dismissible,
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
