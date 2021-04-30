import { ICarriageTypePager, ICarriageTypesResponse } from '../interfaces/CarriageType'
import { BaseRequest } from './BaseRequest'

class CarriageTypeRequest extends BaseRequest {
  prefix = '/CarriageType'

  async getList(parameters: ICarriageTypePager): Promise<ICarriageTypesResponse> {
    const res = await this.axiosInstance.post<ICarriageTypesResponse>(
      this.prefix + '/GetList',
      parameters
    )
    return res.data
  }
}

export default CarriageTypeRequest
