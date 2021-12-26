import { HttpService } from '../../external/services/http.service';
import { IPlugin } from '../../external/types/plugin.types';
import { TComponentType } from '../../external/types/component.types';
import { pluginService } from '../services/plugin.service';

const apiBaseUrl: string = process.env.REACT_APP_PLUGIN_API_URL || '';

class ShopifyService extends HttpService {

  public serviceName: string = process.env.REACT_APP_NINJA_SERVICE_NAME || '';
  public pluginType: TComponentType = (process.env.REACT_APP_NINJA_PLUGIN_TYPE || '') as TComponentType;

  public async getForEditor(pluginId: string = '', defaultPluginData?: IPlugin<any>) {
    const url = `${apiBaseUrl}/api/v1/shopify/${this.pluginType}/${pluginId}?serviceName=${this.serviceName}&${this.queryParams}`;
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
    return await this.makeRequest(`${apiBaseUrl}/api/v1/shopify/${this.pluginType}?serviceName=${this.serviceName}&${this.queryParams}`, {
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
    return await this.makeRequest(`${apiBaseUrl}/api/v1/shopify/${this.pluginType}/${pluginId}?serviceName=${this.serviceName}&${this.queryParams}`, {
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

  public async getUserSubscription() {
    const url = `${apiBaseUrl}/api/v1/shopify/${this.pluginType}/userSubscriptions?serviceName=${this.serviceName}&${this.queryParams}`;
    return await this.makeRequest(url);
  }

  public async createUserSubscription(subscriptionTypeId: string) {
    const url = `${apiBaseUrl}/shopify/api/${subscriptionTypeId ? 'createSubscription' : 'cancelSubscription'}/${this.pluginType}?${this.queryParams}`;
    return await this.makeRequest(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subscriptionTypeId,
      })
    });
  }

}

export const shopifyService = new ShopifyService();