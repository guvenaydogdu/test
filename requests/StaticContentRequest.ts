import {
  ISetStaticContent,
  IStaticContentPager,
  IStaticContentResponse,
  IStaticContentsResponse,
  StaticContentType,
} from '../interfaces/StaticContent'
import { BaseRequest } from './BaseRequest'

class StaticContentRequest extends BaseRequest {
  prefix = '/StaticContent'

  async saveOrUpdate(parameters: ISetStaticContent): Promise<IStaticContentResponse> {
    const res = await this.axiosInstance.post<IStaticContentResponse>(
      this.prefix + '/SaveOrUpdate',
      parameters
    )
    return res.data
  }

  async getList(parameters: IStaticContentPager): Promise<IStaticContentsResponse> {
    const res = await this.axiosInstance.post<IStaticContentsResponse>(
      this.prefix + '/GetList',
      parameters
    )
    return res.data
  }

  async getByPageType(
    pageType: StaticContentType,
    langCode: string
  ): Promise<IStaticContentResponse> {
    const res = await this.axiosInstance.get<IStaticContentResponse>(
      this.prefix + '/GetByPageType' + '?pageType=' + pageType + '&languageCode=' + langCode
    )
    return res.data
  }
}

export default StaticContentRequest
