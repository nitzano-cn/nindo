import { IPluginContext } from '../../external/types/context.types';

export const pluginContextUpdated = (
	updatedState: Partial<IPluginContext>
) => ({
	type: 'PLUGIN_CONTEXT_UPDATED',
	data: updatedState,
});
