import React from 'react';
import Notifications from 'react-notification-system-redux';

import { IAppNotification } from '../../../external/types/appNotification.types';

interface AppNotificationsProps {
	notifications: IAppNotification[];
}

export const AppNotifications = ({ notifications }: AppNotificationsProps) => {
	return (
		<Notifications
			notifications={notifications}
			style={{
				Containers: {
					DefaultStyle: {
						width: 520,
						left: '50%',
					},
				},
				NotificationItem: {
					DefaultStyle: {
						padding: '10px 20px',
					},
				},
				Title: {
					DefaultStyle: {
						margin: '0',
					},
				},
			}}
		/>
	);
};
