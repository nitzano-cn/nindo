import { HttpService } from '../../external/services/http.service';
import { IPlugin } from '../../external/types/plugin.types';
import { TComponentType } from '../../external/types/component.types';
import { pluginService } from '../services/plugin.service';

const apiBaseUrl: string = process.env.REACT_APP_PLUGIN_API_URL || '';

class DudaService extends HttpService {

  public serviceName: string = process.env.REACT_APP_NINJA_SERVICE_NAME || '';
  public pluginType: TComponentType = (process.env.REACT_APP_NINJA_PLUGIN_TYPE || '') as TComponentType;

  public async getForEditor(pluginId: string = '', defaultPluginData?: IPlugin<any>) {
    const url = `${apiBaseUrl}/api/v1/duda/${this.pluginType}/${pluginId}?serviceName=${this.serviceName}&${this.queryParams}`;
    return await this.makeRequest(url).then((res) => {
      if (res.success && res.data) {
        res.data = {
          ...(defaultPluginData || {}),
          ...res.data,
        };

        pluginService.setMetaTags(res);
      }
      return res;
    });
  }

  public async create(body: any) {
    return await this.makeRequest(`${apiBaseUrl}/api/v1/duda/${this.pluginType}?serviceName=${this.serviceName}&${this.queryParams}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: body.data,
        name: body.name,
        description: body.description,
        privacy: body.privacy,
        modelVersion: body.modelVersion,
        status: body.status,
      })
    });
  }

  public async update(pluginId: string = '', body: IPlugin<any>) {
    return await this.makeRequest(`${apiBaseUrl}/api/v1/duda/${this.pluginType}/${pluginId}?serviceName=${this.serviceName}&${this.queryParams}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: body.data,
        name: body.name,
        description: body.description,
        privacy: body.privacy,
        modelVersion: body.modelVersion,
        status: body.status,
      })
    });
  }

}

export const dudaService = new DudaService();