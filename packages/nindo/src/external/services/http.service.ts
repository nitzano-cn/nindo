import { TComponentType } from '../types/component.types';

export class HttpService {
	public queryParams: string =
		typeof window !== 'undefined'
			? (window?.location?.search || '').split('?')[1] || ''
			: '';
	public serviceName: string = process.env.REACT_APP_NINJA_SERVICE_NAME || '';
	public pluginType: TComponentType = (process.env
		.REACT_APP_NINJA_PLUGIN_TYPE || '') as TComponentType;

	async makeRequest(url: string, params: any = {}, isJson: boolean = true) {
		const req: Response = await fetch(
			url,
			Object.assign({}, params, { credentials: 'include' })
		);

		if (req.ok) {
			if (isJson) {
				return await req.json();
			}
			return true;
		}

		throw new Error(`Response code: ${req.status}`);
	}
}
