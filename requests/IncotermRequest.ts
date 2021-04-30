import { IIncotermPager, IIncotermsResponse } from '../interfaces/Incoterm'
import { BaseRequest } from './BaseRequest'

class IncotermRequest extends BaseRequest {
  prefix = '/Incoterm'

  async getList(parameters: IIncotermPager): Promise<IIncotermsResponse> {
    const res = await this.axiosInstance.post<IIncotermsResponse>(
      this.prefix + '/GetList',
      parameters
    )
    return res.data
  }
}

export default IncotermRequest
