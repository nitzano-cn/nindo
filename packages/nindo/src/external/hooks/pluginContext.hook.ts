import { useSelector } from 'react-redux';

import { IAppState } from '../types/state.types';
import { IPluginContext } from '../../external/types/context.types';

export function usePluginContext(): IPluginContext {
	const { pluginContext } = useSelector((state: IAppState<any>) => ({
		pluginContext: state.pluginContext,
	}));

	return pluginContext;
}
