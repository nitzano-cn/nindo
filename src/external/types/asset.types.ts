export interface IAssetsQueryParams {
  q: string
  page: number
  limit: number
  total: number
}

export enum AssetType {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  PDF = 'pdf',
  CSV = 'csv',
  ALL = ''
}

export interface IAsset {
  guid?: string;
  componentId?: string;
  userId: string;
  serviceName: string;
  assetType: AssetType;
  name: string;
  url: string;
  downloadUrl?: string;
}

export interface IAssetFigure extends IAsset {
  thumbnail?: string;
  author?: {
    name: string;
    url: string;
  }
}

export const FileTypes = new Map<AssetType, string>(); 
FileTypes.set(AssetType.IMAGE, 'image/*');
FileTypes.set(AssetType.CSV, 'text/csv');
FileTypes.set(AssetType.PDF, 'application/pdf');
FileTypes.set(AssetType.AUDIO, 'audio/*');
FileTypes.set(AssetType.VIDEO, 'video/*');
FileTypes.set(AssetType.ALL, '');

export interface IUnsplashImage {
  guid: string;
  thumbnail: string;
  url: string;
  downloadUrl: string;
  author: {
    name: string;
    url: string;
  }
  description: string;
}