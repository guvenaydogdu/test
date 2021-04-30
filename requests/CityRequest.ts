import { ICityPagerInput, ICitiesResponse } from '../interfaces/City'

import { BaseRequest } from './BaseRequest'

class CityRequest extends BaseRequest {
  prefix = '/City'

  async getList(parameters: ICityPagerInput): Promise<ICitiesResponse> {
    const res = await this.axiosInstance.post<ICitiesResponse>(this.prefix + '/GetList', parameters)
    return res.data as ICitiesResponse
  }
}

export default CityRequest
