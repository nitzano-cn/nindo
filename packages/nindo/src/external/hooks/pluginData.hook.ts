import { useDispatch, useSelector } from 'react-redux';

import { IAppState } from '../types/state.types';
import { IPlugin } from '../types/plugin.types';
import { dataUpdated } from '../../internal/actions/plugin.actions';

export function usePluginData<T>(): [
	IPlugin<T>,
	(updatedData: Partial<T>) => void
] {
	const { pluginData } = useSelector((state: IAppState<T>) => ({
		pluginData: state.plugin,
	}));
	const dispatch = useDispatch();

	function updateData<T>(updatedData: T) {
		dispatch(dataUpdated(updatedData));
	}

	return [pluginData, updateData];
}
