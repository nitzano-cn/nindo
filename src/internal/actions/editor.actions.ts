import { dudaService, shopifyService, bigCommerceService, shift4ShopService, pluginService, wixService } from '../services';
import { EditorActionTypes, IEditorState, TSiteBuilderVendor } from '../../external/types/editor.types';
import { IHttpResult } from '../../external/types/http.types';
import { gotPluginData } from './plugin.actions';
import { IPlugin } from '../../external/types/plugin.types';
import { Dispatch } from 'react';
import { savedStateChange, savingStateChange } from './history.actions';
import { notificationHelper } from '../../external/helpers/notification.helper';

export const hasErrorStateChange = (hasError: boolean) => ({
  type: EditorActionTypes.EDITOR_SET_ERROR,
  hasError
});

export const savePlugin = (successCallback?: (pluginId: string) => void, errorCallback?: (err: string) => void, vendor?: TSiteBuilderVendor) => {
  return async (dispatch: Function, getState: Function) => {
    const state = getState();
    const plugin: IPlugin<any> = state.plugin;

    dispatch(savingStateChange(true));

    try {
      let result: IHttpResult = { success: false };
      
      if (plugin.guid) {
        if (!vendor) {
          result = await pluginService.update(plugin.guid, plugin);
        } else if (vendor === 'duda') {
          result = await dudaService.update(plugin.guid, plugin);
        } else if (vendor === 'wix') {
          result = await wixService.update(plugin.guid, plugin);
        } else if (vendor === 'shopify') {
          result = await shopifyService.update(plugin.guid, plugin);
        } else if (vendor === 'bigcommerce') {
          result = await bigCommerceService.update(plugin.guid, plugin);
        } else if (vendor === 'shift4shop') {
          result = await shift4ShopService.update(plugin.guid, plugin);
        }
      } else {
        if (!vendor) {
          result = await pluginService.create(plugin);
        } else if (vendor === 'duda') {
          result = await dudaService.create(plugin);
        } else if (vendor === 'shopify') {
          result = await shopifyService.create(plugin);
        } else if (vendor === 'bigcommerce') {
          result = await bigCommerceService.create(plugin);
        } else if (vendor === 'shift4shop') {
          result = await shift4ShopService.create(plugin);
        }
      }
      
      if (result.success) {
        dispatch(savedStateChange(true));

        if (!plugin.guid) {
          if (successCallback) {
            dispatch(gotPluginData(result.data));
            successCallback(result.data.guid);
          } else {
            setTimeout(() => {
              if (typeof window !== 'undefined') {
                const [baseUrl, query = ''] = window.location.href.split('?');
                window.location.href = (`${baseUrl}/${result.data.guid}?${query}`).replace(`//${result.data.guid}`, `/${result.data.guid}`);
              }
            }, 10);
          }
        } else {
          if (successCallback) {
            successCallback(plugin.guid);
          } else {
            notificationHelper.success({
              title: 'Your changes have been successfully saved.',
              message: 'It might take a minute to see the updates live.',
              position: 'tc',
              autoDismiss: 3,
            });
          }
        }
      } else {
        throw new Error(result.message);
      }
    } catch (e) {
      const errMessage: string = (e as Error).message || 'Could not save plugin. Please try again or contact our support.';
      
      if (errorCallback) {
        errorCallback(errMessage);
      } else {
        notificationHelper.error({
          title: errMessage,
          position: 'tc',
          autoDismiss: 4.5,
        });
      }
    }
    
    dispatch(savingStateChange(false));
  }
};

export const redoAction = (items: IPlugin<any>[], newIndex: number) => ({
  type: EditorActionTypes.EDITOR_REDO,
  items,
  newIndex
});

export const undoAction = (items: IPlugin<any>[], newIndex: number) => ({
  type: EditorActionTypes.EDITOR_UNDO,
  items,
  newIndex
});

export const undo = () => {
  return (dispatch: Dispatch<any>, getState: Function) => {
    const state = getState();
    const chart: IPlugin<any> = state.plugin;
    const editor: IEditorState<any> = state.editor;
    const { history } = editor;

    const currentChartDataState = Object.assign({}, chart, {});
    const historyCopy = [...history.items];
    const nextIndex = history.activeIndex - 1;
    const nextItem = historyCopy[nextIndex];

    if (history.activeIndex === history.items.length) {
      historyCopy.push(currentChartDataState);
    }

    dispatch(undoAction([...historyCopy], nextIndex));
    dispatch(gotPluginData(nextItem));
  };
};

export const redo = () => {
  return (dispatch: Dispatch<any>, getState: Function) => {
    const state = getState();
    const editor: IEditorState<any> = state.editor;
    const { history } = editor;

    const historyCopy = [...history.items];
    const nextIndex = history.activeIndex + 1;
    const nextItem = historyCopy[nextIndex];
    
    dispatch(redoAction([...historyCopy], nextIndex));
    dispatch(gotPluginData(nextItem));
  };
};