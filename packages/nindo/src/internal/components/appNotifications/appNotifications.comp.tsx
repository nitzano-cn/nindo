import React from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const getAppNotificationElm = (title: string, message: string, children?: any) => ({ closeToast, toastProps }: any) => (
	<>
		<p style={{ margin: 0 }}>{title}</p>
		<p style={{ margin: 0 }}>{message}</p>
		<div style={{ margin: 0 }}>{children}</div>
	</>
);

export const AppNotifications = () => {
	return (
		<ToastContainer 
			position="top-center" 
			autoClose={false}
			closeButton={true}
			className="app-notifications"
			draggable={false}
			limit={2}
		/>
	);
};
