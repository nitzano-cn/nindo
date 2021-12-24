export interface ISkin<T> {
  name: string
  skinStyles: T
  color?: string
  thumbnail?: string
  isPremium?: boolean
}