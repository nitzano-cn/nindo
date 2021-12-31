import { useSelector } from 'react-redux';

import { IUser } from '../types/user.types';
import { IAppState } from '../types/state.types';

export function useUserState(): IUser {
  const { user } = useSelector((state: IAppState<any>) => ({
    user: state.user,
  }));

  return user;
}