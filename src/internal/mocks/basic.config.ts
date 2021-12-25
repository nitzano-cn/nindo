interface IBasicConfig {
	origin: string;
	responseBody: {
		success: boolean;
		message: string;
		data: any;
	}
}

export const basicMockConfig: IBasicConfig = {
  origin: 'http://localhost:3000',
	responseBody: {
		success: true,
		message: '',
		data: null
	},
};