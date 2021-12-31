import { pluginsList } from "../../external/types/component.types";

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