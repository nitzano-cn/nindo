import { useDispatch, useSelector } from 'react-redux';

import { IAppState } from '../types/state.types';
import { pluginStateUpdated } from '../../internal/actions/pluginState.actions';

export function usePluginState<P>(): [P, (updatedState: Partial<P>) => void] {
  const { pluginState } = useSelector((state: IAppState<any, P>) => ({
    pluginState: state.pluginState,
  }));
  const dispatch = useDispatch();
  
  function updateData<P>(updatedState: P) {
    dispatch(pluginStateUpdated(updatedState));
  }

  return [pluginState, updateData];
}