export const pluginStateReducer =
	(defaultState: any = {}) =>
	(state = defaultState, action: any) => {
		switch (action.type) {
			case 'PLUGIN_STATE_UPDATED':
				return Object.assign({}, state, {
					...state,
					...action.data,
				});
			default:
				return state;
		}
	};
