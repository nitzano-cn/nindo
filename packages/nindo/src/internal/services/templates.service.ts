import { HttpService } from '../../external/services/http.service';
import { TComponentType } from '../../external/types/component.types';

const apiBaseUrl: string = process.env.REACT_APP_PLUGIN_API_URL || '';

class TemplatesService extends HttpService {
	async getComponentTemplates(componentType: TComponentType) {
		return await this.makeRequest(
			`${apiBaseUrl}/api/v1/plugin/templates?componentType=${componentType}`
		);
	}
}

export const templatesService = new TemplatesService();
