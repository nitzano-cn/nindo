import React from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const getAppNotificationElm = (title: string, message: string, children?: any) => ({ closeToast, toastProps }: any) => (
	<>
		<p style={{ margin: 0 }}><strong>{title}</strong></p>
		{
			(message || children) && 
			<div style={{ margin: 0 }}>
				{message}&nbsp;{children}
			</div>
		}
	</>
);

export const AppNotifications = () => {
	return (
		<ToastContainer 
			position="top-center" 
			closeButton={true}
			closeOnClick={true}
			className="app-notifications"
			draggable={false}
			limit={2}
		/>
	);
};
