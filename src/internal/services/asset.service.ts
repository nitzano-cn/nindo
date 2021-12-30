import { HttpService } from '../../external/services/http.service';

class AssetService extends HttpService {
  public baseApiUrl: string = '/api/v1';

  async get(q: string = '', limit: number = 12, page: number = 1, assetType: string = '') {
    return await this.makeRequest(`${this.baseApiUrl}/asset?pluginType=${this.pluginType}&serviceName=${this.serviceName}&q=${q}&assetType=${assetType}&limit=${limit}&page=${page}&${this.queryParams}`);
  }

  public async update(assetId: string, name: string) {
    return await this.makeRequest(`${this.baseApiUrl}/asset/${assetId}?pluginType=${this.pluginType}&${this.queryParams}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    });
  }

  public async delete(assetId: string) {
    return await this.makeRequest(`${this.baseApiUrl}/asset/${assetId}?pluginType=${this.pluginType}&${this.queryParams}`, {
      method: 'delete',
    });
  }

}

export const assetService = new AssetService();