import { HttpService } from '../../external/services/http.service';
import { pluginService } from '../services/plugin.service';
import { IPlugin } from '../../external/types/plugin.types';
import { TComponentType } from '../../external/types/component.types';

declare global {
  interface Window {
    Wix: any;
  }
}

const apiBaseUrl: string = process.env.REACT_APP_PLUGIN_API_URL || '';

class WixService extends HttpService {
  public serviceName: string = process.env.REACT_APP_NINJA_SERVICE_NAME || '';
  public pluginType: TComponentType = (process.env.REACT_APP_NINJA_PLUGIN_TYPE || '') as TComponentType;
  
  public getSiteInfo() {
    return new Promise(async (resolve) => {
      let url = '';
      let gotResult = false;
      try {
        if (!window.Wix) {
          throw new Error('Wix is not defined.');
        }
        window.Wix.getSiteInfo((siteInfo: any) => {
          gotResult = true;
          if (siteInfo && siteInfo.url) {
            url = siteInfo.url || '';
          }
          resolve(url);
        });
      } catch(e) {
        gotResult = true;
        resolve(url);
      }

      // Make sure request is sent
      window.setTimeout(() => {
        if (!gotResult) {
          resolve(url);
        }
      }, 1000);
    });
  }

  public async get() {
    const siteUrl = await this.getSiteInfo();
    const url = `${apiBaseUrl}/api/v1/wix/${this.pluginType}/viewer?serviceName=${this.serviceName}&siteUrl=${siteUrl}&${this.queryParams}`;
    return await this.makeRequest(url).then(pluginService.setMetaTags);
  }

  public async getForEditor(defaultPluginData?: IPlugin<any>) {
    const url = `${apiBaseUrl}/api/v1/wix/${this.pluginType}?serviceName=${this.serviceName}&${this.queryParams}`;
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

  public async update(pluginId: string, body: IPlugin<any>) {
    const url = `${apiBaseUrl}/api/v1/wix/${this.pluginType}/${pluginId}?serviceName=${this.serviceName}&${this.queryParams}`;
    
    return await this.makeRequest(url, { 
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: body.name,
        description: body.description,
        privacy: 'private',
        data: body.data,
        modelVersion: body.modelVersion,
        status: body.status,
      })
    });
  }

}

export const wixService = new WixService();