import { IResponse, IPagerInput, ICommon } from './Common'

interface IAnnouncement extends ICommon {
  title?: string
  shortDescription?: string
  body?: string
  languageCode: string
  startDate: string
  endDate: string
}

interface IAnnouncementCategory extends ICommon {
  name?: string
  icon?: string
}

interface INewAnnouncementCategory {
  name: string
  icon: string
}

interface IUpdateAnnouncementCategory {
  id: number
  name: string
  icon: string
}

interface INewAnnouncement {
  title: string
  shortDescription: string
  body: string
  languageCode: string
  startDate: string
  endDate: string
}

interface IUpdateAnnouncement {
  id: number
  title: string
  shortDescription: string
  body: string
  languageCode: string
  startDate: string
  endDate: string
}

interface IAnnouncementPager extends IPagerInput {
  categoryIds?: number[]
  startDate?: string
  endDate?: string
}

type IAnnouncementCategoryResponse = IResponse<IAnnouncementCategory>
type IAnnouncementCategoriesResponse = IResponse<IAnnouncementCategory[]>
type IAnnouncementCategoryPager = IPagerInput
type IAnnouncementResponse = IResponse<IAnnouncement>
type IAnnouncementsResponse = IResponse<IAnnouncement[]>

export type {
  IAnnouncement,
  IAnnouncementCategory,
  INewAnnouncementCategory,
  IUpdateAnnouncementCategory,
  IAnnouncementPager,
  INewAnnouncement,
  IUpdateAnnouncement,
  IAnnouncementCategoryResponse,
  IAnnouncementCategoriesResponse,
  IAnnouncementResponse,
  IAnnouncementsResponse,
  IAnnouncementCategoryPager,
}
