import { IAddSpecialRequest } from '../interfaces/SpecialRequest'
import { BaseRequest } from './BaseRequest'

class SpecialRequest extends BaseRequest {
  prefix = '/SpecialRequest'

  async create(data: IAddSpecialRequest): Promise<any> {
    const res = await this.axiosInstance.post<any>(this.prefix + '/Create', data)
    return res.data
  }
}

export default SpecialRequest
