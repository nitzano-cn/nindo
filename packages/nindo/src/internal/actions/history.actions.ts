import { Dispatch } from 'react';
import {
	EditorActionTypes,
	IEditorState,
} from '../../external/types/editor.types';
import { IPlugin } from '../../external/types/plugin.types';

export const historyChangeAction = (
	items: IPlugin<any>[],
	newIndex: number,
	firstUpdate: boolean
) => ({
	type: EditorActionTypes.EDITOR_HISTORY_CHANGE,
	items,
	newIndex,
	firstUpdate,
});

export const savedStateChange = (saved: boolean) => ({
	type: EditorActionTypes.EDITOR_SET_SAVED,
	saved,
});

export const savingStateChange = (saving: boolean) => ({
	type: EditorActionTypes.EDITOR_SET_SAVING,
	saving,
});

export const historyChange = (
	data: IPlugin<any>,
	firstUpdate: boolean = false
) => {
	return (dispatch: Dispatch<any>, getState: Function) => {
		const state = getState();
		const editor: IEditorState<any> = state.editor;
		const { history } = editor;

		const historyCopy = [...history.items, data];

		dispatch(
			historyChangeAction(historyCopy, historyCopy.length - 1, firstUpdate)
		);
	};
};
