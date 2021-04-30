import { IRefusalReasonPager, IRefusalReasonsResponse } from '../interfaces/RefusalReason'
import { BaseRequest } from './BaseRequest'

class RefusalReasonRequest extends BaseRequest {
  prefix = '/RefusalReason'

  async getList(data: IRefusalReasonPager): Promise<IRefusalReasonsResponse> {
    const res = await this.axiosInstance.post<IRefusalReasonsResponse>(
      this.prefix + '/GetList',
      data
    )
    return res.data
  }
}

export default RefusalReasonRequest
