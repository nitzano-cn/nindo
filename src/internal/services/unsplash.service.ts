import { HttpService } from '../../external/services/http.service';
import { assetService } from './asset.service';

class UnsplashService extends HttpService {

  public serviceName: string = process.env.REACT_APP_NINJA_SERVICE_NAME || '';

  public async downloadImage(downloadLocation: string) {
    const url = `${assetService.baseApiUrl}/asset/unsplash/download?${assetService.queryParams}`;
    return await this.makeRequest(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        downloadLocation,
      })
    });
  }

}

export const unsplashService = new UnsplashService();