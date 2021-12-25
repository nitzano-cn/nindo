import { v4 as uuidv4 } from 'uuid';

import { IUserStateMocks } from '../../external/types/mocks.types';
import { basicMockConfig } from './basic.config';

const { origin, responseBody } = basicMockConfig;

export const userMocks = ({ userData, planFeaturesData }: IUserStateMocks) => {
	const getUserDetails = {
		id: uuidv4(),
		active: true,
		method: 'GET',
		url: 'http://localhost:3000/api/v1/user?*',
		headers: {},
		params: '',
		response: {
			status: 200,
			delay: 382,
			headers: {
				'content-type': 'application/json',
			},
			body: {
				...responseBody,
				data: { ...userData },
			},
		},
		name: 'User details',
		origin: origin,
	};
	
	const getPlanFeatures = {
		id: uuidv4(),
		active: true,
		method: 'GET',
		url: `${origin}/api/v1/user/planFeatures*?serviceName=*`,
		headers: {},
		params: '',
		response: {
			status: 200,
			delay: 111,
			headers: {
				'content-type': 'application/json; charset=utf-8',
			},
			body: {
				success: true,
				message: '',
				data: { ...planFeaturesData },
			},
		},
		name: 'User plan features',
		origin: origin,
	};

	return [getUserDetails, getPlanFeatures];
}
