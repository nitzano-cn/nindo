import React from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const getAppNotificationElm = (title: string, message: string, children?: any) => ({ closeToast, toastProps }: any) => (
	<div>
		<p>{title}</p>
		<p>{message}</p>
		<div>{children}</div>
	</div>
);

export const AppNotifications = () => {
	return (
		<ToastContainer 
			position="top-center" 
			closeButton={true}
			className="app-notifications"
			draggable={false}
			limit={2}
		/>
	);
};
