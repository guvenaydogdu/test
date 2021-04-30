import { ICommon, IPagerInput, IResponse } from './Common'

export enum StaticContentType {
  Services = 1,
  About = 2,
  Database = 3,
  LoadTracking = 4,
  HowItWork = 5,
  SeawayServices = 6,
  AirwayServices = 7,
  HighwayServices = 8,
  RailwayServices = 9,
  SpecialServices = 10,
}

interface IStaticContent extends ICommon {
  code: string
  name: string
  value: string
  description: string
  pageType: StaticContentType
  languageCode: string
}

interface ISetStaticContent {
  name: string
  value: string
  description: string
  pageType: StaticContentType
  languageCode: string
}
type IStaticContentsResponse = IResponse<IStaticContent[]>
type IStaticContentResponse = IResponse<IStaticContent>

type IStaticContentPager = IPagerInput

export type {
  IStaticContent,
  ISetStaticContent,
  IStaticContentResponse,
  IStaticContentPager,
  IStaticContentsResponse,
}
