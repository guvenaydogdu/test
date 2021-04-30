import { ICountriesResponse, ICountryPagerInput } from '../interfaces/City'

import { BaseRequest } from './BaseRequest'

class CountryRequest extends BaseRequest {
  prefix = '/Country'

  async getList(parameters: ICountryPagerInput): Promise<ICountriesResponse> {
    const res = await this.axiosInstance.post<ICountriesResponse>(
      this.prefix + '/GetList',
      parameters
    )
    return res.data as ICountriesResponse
  }
}

export default CountryRequest
