import { TPlatform } from './editor.types';
import { TPluginMode } from './plugin.types';

export interface IPluginContext {
	mode?: TPluginMode;
	instanceId?: string;
	appId?: string;
	platform?: TPlatform;
}
