export interface IUser {
  isAuthenticated: boolean
  fullName: string
  thumbnail: string
  isPremium?: boolean
}

export enum UserActionTypes {
  USER_DETAILS_CHANGED = 'USER_DETAILS_CHANGED',
  USER_LOGGEDIN = 'USER_LOGGEDIN',
  USER_LOGGEDOUT = 'USER_LOGGEDOUT'
}