import { IUpdateUserCompany, IUserCompanyResponse } from '../interfaces/UserCompany'
import { BaseRequest } from './BaseRequest'

class UserCompanyRequest extends BaseRequest {
  prefix = '/UserCompany'

  async getByUserId(userId: number): Promise<IUserCompanyResponse> {
    const res = await this.axiosInstance.get<IUserCompanyResponse>(
      this.prefix + '/GetByUserId' + `?id=${userId}`
    )
    return res.data as IUserCompanyResponse
  }

  async update(updateData: IUpdateUserCompany): Promise<IUserCompanyResponse> {
    const res = await this.axiosInstance.post<IUserCompanyResponse>(
      this.prefix + '/Update',
      updateData
    )
    return res.data as IUserCompanyResponse
  }
}

export default UserCompanyRequest
