import { IPlugin } from './plugin.types';

export interface IViewerProps<T> {
	postGetDataProcess?: (data: IPlugin<T>) => IPlugin<T> | Promise<IPlugin<T>>;
	onLoad?: (pluginData: IPlugin<T>) => void | Promise<void>;
	muteEvents?: boolean;
	dataRefreshTTL?: number; // In milliseconds
	viewerSettings?: IViewerSettings;
}

export interface IViewerSettings {
	inlineElm?: boolean;
	viewerSelector?: string;
	minHeight?: number;
	minWidth?: number;
	maxHeight?: number;
	maxWidth?: number;
	ignoreFrameResize?: boolean;
	onFrameResize?: (width: number, height: number) => void;
}
