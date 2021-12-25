import { UserActionTypes, IUser } from '../../external/types/user.types';

const defaultState: IUser = {
  isAuthenticated: false,
  isPremium: false,
  fullName: '',
  thumbnail: '',
};

export const userReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case UserActionTypes.USER_LOGGEDIN:
      return Object.assign({}, state, {
        isAuthenticated: true,
        ...action.data
      });
    case UserActionTypes.USER_DETAILS_CHANGED:
      return Object.assign({}, state, action.data);
    case UserActionTypes.USER_LOGGEDOUT:
      return Object.assign({}, defaultState, {});
    default:
      return state;
  }

}
