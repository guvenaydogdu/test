import { IImoClassPager, IImoClassesResponse } from '../interfaces/ImoClass'
import { BaseRequest } from './BaseRequest'

class ImoClassRequest extends BaseRequest {
  prefix = '/ImoClass'

  async getList(parameters: IImoClassPager): Promise<IImoClassesResponse> {
    const res = await this.axiosInstance.post<IImoClassesResponse>(
      this.prefix + '/GetList',
      parameters
    )
    return res.data
  }
}

export default ImoClassRequest
