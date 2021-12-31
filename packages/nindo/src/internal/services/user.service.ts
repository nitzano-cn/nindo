import { HttpService } from '../../external/services/http.service';

const apiBaseUrl: string = process.env.REACT_APP_PLUGIN_API_URL || '';

class UserService extends HttpService {
  async getUserInfo() {
    return await this.makeRequest(`${apiBaseUrl}/api/v1/user?serviceName=${this.serviceName}`);
  }

  async getPlanFeatures(pluginId: string = '') {
    return await this.makeRequest(`${apiBaseUrl}/api/v1/user/planFeatures/${pluginId}?serviceName=${this.serviceName}`);
  }

  async logout() {
    await this.makeRequest(`${apiBaseUrl}/api/user/logout`, {}, false);
    return await this.makeRequest(`${apiBaseUrl}/api/v1/user/logout?serviceName=${this.serviceName}`, {}, false);
  }
}

export const userService = new UserService();