import {
  INewAnnouncementCategory,
  IUpdateAnnouncementCategory,
  IAnnouncementCategoryResponse,
  IAnnouncementCategoriesResponse,
  IAnnouncementCategoryPager,
} from '../interfaces/Announcement'
import { IResultModel } from '../interfaces/Common'

import { BaseRequest } from './BaseRequest'

class AnnouncementCategoryRequest extends BaseRequest {
  prefix = '/AnnouncementCategory'

  async insert(parameters: INewAnnouncementCategory): Promise<IAnnouncementCategoryResponse> {
    const res = await this.axiosInstance.post<IAnnouncementCategoryResponse>(
      this.prefix + '/Insert',
      parameters
    )
    return res.data
  }

  async update(parameters: IUpdateAnnouncementCategory): Promise<IAnnouncementCategoryResponse> {
    const res = await this.axiosInstance.post<IAnnouncementCategoryResponse>(
      this.prefix + '/Update',
      parameters
    )
    return res.data
  }

  async remove(id: number): Promise<IResultModel> {
    const res = await this.axiosInstance.get<IResultModel>(this.prefix + '/Delete' + `?id=${id}`)
    return res.data
  }

  async getList(parameters: IAnnouncementCategoryPager): Promise<IAnnouncementCategoriesResponse> {
    const res = await this.axiosInstance.post<IAnnouncementCategoriesResponse>(
      this.prefix + '/GetList',
      parameters
    )
    return res.data
  }

  async get(id: number): Promise<IResultModel> {
    const res = await this.axiosInstance.get<IResultModel>(this.prefix + '/Get' + `?id=${id}`)
    return res.data
  }
}

export default AnnouncementCategoryRequest
