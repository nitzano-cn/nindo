import { HttpService } from '../../external/services/http.service';
import { pluginService } from '../services/plugin.service';

declare global {
  interface Window {
    Wix: any;
  }
}

const apiBaseUrl: string = process.env.REACT_APP_PLUGIN_API_URL || '';

class WixService extends HttpService {
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
    const url = `${apiBaseUrl}/api/v1/wix/plugin/viewer?pluginType=${this.pluginType}&serviceName=${this.serviceName}&siteUrl=${siteUrl}&${this.queryParams}`;
    return await this.makeRequest(url).then(pluginService.setMetaTags);
  }
}

export const wixService = new WixService();