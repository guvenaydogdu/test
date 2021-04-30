import {
  IAnnouncementPager,
  INewAnnouncement,
  IUpdateAnnouncement,
  IAnnouncementResponse,
  IAnnouncementsResponse,
} from '../interfaces/Announcement'
import { IResultModel } from '../interfaces/Common'

import { BaseRequest } from './BaseRequest'

class AnnouncementRequest extends BaseRequest {
  prefix = '/Announcement'

  async insert(parameters: INewAnnouncement): Promise<IAnnouncementResponse> {
    const res = await this.axiosInstance.post<IAnnouncementResponse>(
      this.prefix + '/Create',
      parameters
    )
    return res.data
  }

  async update(parameters: IUpdateAnnouncement): Promise<IAnnouncementResponse> {
    const res = await this.axiosInstance.post<IAnnouncementResponse>(
      this.prefix + '/Update',
      parameters
    )
    return res.data
  }

  async remove(id: number): Promise<IResultModel> {
    const res = await this.axiosInstance.get<IResultModel>(this.prefix + '/Delete' + `?id=${id}`)
    return res.data
  }

  async getList(parameters: IAnnouncementPager): Promise<IAnnouncementsResponse> {
    const res = await this.axiosInstance.post<IAnnouncementsResponse>(
      this.prefix + '/GetList',
      parameters
    )
    return res.data
  }

  async get(id: number): Promise<IAnnouncementResponse> {
    const res = await this.axiosInstance.get<IAnnouncementResponse>(
      this.prefix + '/Get' + `?id=${id}`
    )
    return res.data
  }
  async getCurrentAnnouncement(languageCode: string): Promise<IAnnouncementResponse> {
    const res = await this.axiosInstance.get<IAnnouncementResponse>(
      this.prefix + '/GetCurrentAnnouncement' + `?langCode=${languageCode}`
    )
    return res.data
  }
}

export default AnnouncementRequest
