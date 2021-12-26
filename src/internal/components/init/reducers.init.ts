import {
	applyMiddleware,
	combineReducers,
	createStore,
	Reducer,
	Store,
} from 'redux';
import thunk from 'redux-thunk';
import {
	editorReducer,
	notificationsReducer,
	pluginReducer,
	pluginStateReducer,
	userReducer,
} from '../../reducers';
import { IPlugin } from '../../../external/types/plugin.types';
import { IAppConfig } from '../../../external/types/app.types';
import { IAppState } from '../../../external/types/state.types';

let store: AppStateStore<any, any>;

function provideReducers<T, P = {}>(
	defaultState: IPlugin<T>,
	pluginState?: P
): Reducer<any> {
	return combineReducers({
		user: userReducer,
		plugin: pluginReducer(defaultState),
		pluginState: pluginStateReducer(pluginState),
		editor: editorReducer,
		notifications: notificationsReducer,
	});
}

export function genStore<T, P>(
	env: string,
	appConfig: IAppConfig<T>
): AppStateStore<T, P> {
	const reducers = provideReducers(appConfig.plugin.defaultData, appConfig.pluginState || {});
	const store = createStore(
		reducers,
		{},
		applyMiddleware(thunk as any)
	);

	return store;
}

export function getStore<T, P>(): AppStateStore<T, P> {
	if (!store) {
		throw Error('Store was not generated');
	}

	return store;
}

export type AppStateStore<T, P> = Store<IAppState<T, P>>;
