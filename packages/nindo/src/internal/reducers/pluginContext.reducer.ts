import { IPluginContext } from '../../external/types/context.types';

const defaultContextState: IPluginContext = {
	mode: undefined,
	instanceId: undefined,
	platform: undefined,
	appId: undefined,
};

export const pluginContextReducer =
	(defaultState: IPluginContext = defaultContextState) =>
	(state = defaultState, action: any) => {
		switch (action.type) {
			case 'PLUGIN_CONTEXT_UPDATED':
				return Object.assign({}, state, {
					...state,
					...action.data,
				});
			default:
				return state;
		}
	};
