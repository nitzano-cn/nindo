import { IUser } from '../types/user.types';

export interface IUserStateMocks {
	userData?: IUser;
	planFeaturesData?: { [key: string]: any };
}
