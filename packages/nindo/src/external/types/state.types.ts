import { IPluginContext } from './context.types';
import { IEditorState } from './editor.types';
import { IPlugin } from './plugin.types';
import { IUser } from './user.types';

export interface IAppState<T, P = {}> {
	user: IUser;
	plugin: IPlugin<T>;
	pluginState: P;
	pluginContext: IPluginContext;
	editor: IEditorState<T>;
}
