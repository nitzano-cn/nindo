import { UserActionTypes } from '../../external/types/user.types';

export const loggedIn = (data: any) => ({
	type: UserActionTypes.USER_LOGGEDIN,
	data,
});

export const detailsChanged = (data: any) => ({
	type: UserActionTypes.USER_DETAILS_CHANGED,
	data,
});

export const loggedOut = () => ({
	type: UserActionTypes.USER_LOGGEDOUT,
});

export const logout = () => (dispatch: any) => {
	dispatch(loggedOut());
};
