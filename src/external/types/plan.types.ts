export interface IUserSubscription {
  plan: {
    name: string
    id: string
  }
}

export interface ICycle {
  period: 'month' | 'year'
  billingCycle: number
  discount: number
  description: string
  default: boolean
}

export interface IFeature {
  name: string
  display: string
  tip: null | string
  highlight: boolean
}

export interface IFeatureGroup {
  name: string,
  display: string,
  features: IFeature[]
}

export interface IPlanIDs {
  [key: string]: {
    commonninja: string
    bluesnap: string | number
    paypalApi: string
  }
}

export interface IPlan {
  name: string
  className: string
  pricing: number
  features: { [key: string]: string | number }
  planIds?: IPlanIDs
}

export interface IPricingModel {
  _id: string
  services: string[]
  name: string
  description: string
  cycles: ICycle[]
  featureGroups: IFeatureGroup[]
  plans: IPlan[]
}