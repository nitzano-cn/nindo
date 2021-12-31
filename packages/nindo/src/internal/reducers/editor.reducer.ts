import {
	EditorActionTypes,
	IEditorState,
} from '../../external/types/editor.types';

const defaultState: IEditorState<any> = {
	isSaved: true,
	saving: false,
	hasError: false,
	history: {
		items: [],
		activeIndex: 0,
	},
};

export const editorReducer = (state = defaultState, action: any) => {
	switch (action.type) {
		case EditorActionTypes.EDITOR_SET_SAVED:
			return Object.assign({}, state, {
				isSaved: action.saved,
			});
		case EditorActionTypes.EDITOR_SET_ERROR:
			return Object.assign({}, state, {
				hasError: action.hasError,
			});
		case EditorActionTypes.EDITOR_SET_SAVING:
			return Object.assign({}, state, {
				saving: action.saving,
			});
		case EditorActionTypes.EDITOR_UNDO:
			return Object.assign({}, state, {
				history: {
					items: action.items,
					activeIndex: action.newIndex,
				},
				isSaved: false,
			});
		case EditorActionTypes.EDITOR_REDO:
			return Object.assign({}, state, {
				history: {
					items: action.items,
					activeIndex: action.newIndex,
				},
				isSaved: false,
			});
		case EditorActionTypes.EDITOR_HISTORY_CHANGE:
			return Object.assign({}, state, {
				history: {
					items: action.items,
					activeIndex: action.newIndex,
				},
				isSaved: action.firstUpdate,
			});
		default:
			return state;
	}
};
