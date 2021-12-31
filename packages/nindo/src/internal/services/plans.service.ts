import { HttpService } from '../../external/services/http.service';

const apiBaseUrl: string = process.env.REACT_APP_PLUGIN_API_URL || '';

class PlansService extends HttpService {
	async getPlanData(serviceName: string) {
		return await this.makeRequest(`${apiBaseUrl}/api/plan/${serviceName}`);
	}

	async getUserSubscription(serviceName: string, vendor?: string) {
		const query = vendor ? `?${this.queryParams}` : '';
		return await this.makeRequest(
			`${apiBaseUrl}/api/subscription${
				vendor ? '/v/' + vendor : ''
			}/${serviceName}${query}`
		);
	}

	async reportFunnelEvent(eventType: string) {
		return await this.makeRequest(
			`${apiBaseUrl}/api/funnelEvent?type=${eventType}`,
			{},
			false
		);
	}
}

export const plansService = new PlansService();
