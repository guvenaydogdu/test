import { IResultModel } from '../interfaces/Common'
import {
  IAddLanguage,
  ILanguagePager,
  ILanguageResponse,
  ILanguagesResponse,
} from '../interfaces/Language'
import { BaseRequest } from './BaseRequest'
class LanguageRequest extends BaseRequest {
  prefix = '/Language'

  async getList(parameters: ILanguagePager): Promise<ILanguagesResponse> {
    const res = await this.axiosInstance.post<ILanguagesResponse>(
      this.prefix + '/GetList',
      parameters
    )
    return res.data
  }
  async create(parameters: IAddLanguage): Promise<ILanguageResponse> {
    const res = await this.axiosInstance.post<ILanguageResponse>(
      this.prefix + '/Create',
      parameters
    )
    return res.data
  }
  async remove(id: number): Promise<IResultModel> {
    const res = await this.axiosInstance.get<IResultModel>(this.prefix + '/Delete' + '?id=' + id)
    return res.data
  }
}

export default LanguageRequest
