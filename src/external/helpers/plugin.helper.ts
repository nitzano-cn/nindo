import { pluginService } from '../../internal/services/plugin.service';
import { IPlugin, pluginsList, TPluginState } from '../types';

export function getPluginNameByService(serviceName: string, defaultName: string) {
  const listing = pluginsList.filter((l) => l.serviceName === serviceName)[0];

  if (!listing) {
    return defaultName;
  }

  return listing.displayName;
}

export function calculatePricing(originalPricing: number, discount?: number) {
  if (!discount) {
    return originalPricing;
  }
  const finalPrice = (originalPricing - (originalPricing * discount / 100));
  return finalPrice % 1 === 0 ? finalPrice : finalPrice.toFixed(2);
}

export const getDefaultPlugin = <T>(data: T, name?: string, status?: TPluginState): IPlugin<T> => ({
	type: pluginService.pluginType,
	guid: null,
	galleryId: null,
	data,
	modelVersion: 1,
	name: name || 'My Plugin',
	description: null,
	previewImage: null,
	privacy: 'public',
	status: status || 'published',
	planFeatures: {},
});
