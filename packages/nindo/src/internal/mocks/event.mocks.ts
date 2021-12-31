import { v4 as uuidv4 } from 'uuid';

import { basicMockConfig } from './basic.config';

const { origin, responseBody } = basicMockConfig;

export const eventMocks = () => {
	const reportEvent = {
		id: uuidv4(),
		active: true,
		method: 'GET',
		url: `${origin}/api/v1/event/report/*?*`,
		headers: {},
		params: '',
		response: {
			status: 200,
			delay: 150,
			headers: {
				'content-type': 'application/json',
			},
			body: { ...responseBody },
		},
		name: 'Report event',
		origin: origin,
	};

	return [reportEvent];
};
