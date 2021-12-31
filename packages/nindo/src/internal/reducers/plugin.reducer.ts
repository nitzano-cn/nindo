import { IPlugin, PluginActionTypes } from '../../external/types/plugin.types';

export const pluginReducer =
	(defaultState: IPlugin<any>) =>
	(state = defaultState, action: any) => {
		switch (action.type) {
			case PluginActionTypes.GOT_DATA:
				return Object.assign({}, state, action.data);
			case PluginActionTypes.PLAN_FEATURES_UPDATED:
				return Object.assign({}, state, {
					planFeatures: action.data,
				});
			case PluginActionTypes.DATA_UPDATED:
				return Object.assign({}, state, {
					data: {
						...state.data,
						...action.data,
					},
				});
			case PluginActionTypes.SETTINGS_UPDATED:
				return Object.assign({}, state, {
					data: {
						...state.data,
						settings: {
							...state.data.settings,
							...action.data,
						},
					},
				});
			case PluginActionTypes.STYLES_UPDATED:
				return Object.assign({}, state, {
					data: {
						...state.data,
						styles: {
							...state.data.styles,
							...action.styles,
						},
					},
				});
			case PluginActionTypes.CONTENT_UPDATED:
				return Object.assign({}, state, {
					data: {
						...state.data,
						// In case content is array type,
						// don't extend (so you won't accedently append data instead of rewriting it.
						content: Array.isArray(state.data.content)
							? action.content
							: {
									...state.data.content,
									...action.data,
							  },
					},
				});
			case PluginActionTypes.PRIVACY_UPDATED:
				return Object.assign({}, state, {
					privacy: action.privacy,
				});
			case PluginActionTypes.STATUS_UPDATED:
				return Object.assign({}, state, {
					status: action.status,
				});
			case PluginActionTypes.NAME_UPDATED:
				return Object.assign({}, state, {
					name: action.name,
				});
			case PluginActionTypes.DESCRIPTION_UPDATED:
				return Object.assign({}, state, {
					description: action.description,
				});
			default:
				return state;
		}
	};
