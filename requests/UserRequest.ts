import { IResultModel } from '../interfaces/Common'
import {
  IAdminUserCreate,
  IUpdateGuarantor,
  IUser,
  IUserChangePassword,
  IUserCreate,
  IUserPager,
  IUserResponse,
  IUsersResponse,
} from '../interfaces/User'

import { BaseRequest } from './BaseRequest'

class UserRequest extends BaseRequest {
  prefix = '/User'

  async get(id: number): Promise<IUserResponse> {
    const res = await this.axiosInstance.get<IUserResponse>(this.prefix + '/Get' + `?id=${id}`)
    return res.data as IUserResponse
  }

  async getList(paramaters: IUserPager): Promise<IUsersResponse> {
    const res = await this.axiosInstance.post<IUsersResponse>(this.prefix + '/GetList', paramaters)
    return res.data as IUsersResponse
  }

  async create(parameters: IUserCreate): Promise<IUser> {
    const res = await this.axiosInstance.post<IUser>(this.prefix + '/Create', parameters)
    return res.data
  }

  async adminUserCreate(parameters: IAdminUserCreate): Promise<IUserResponse> {
    const res = await this.axiosInstance.post<IUserResponse>(
      this.prefix + '/AdminUserCreate',
      parameters
    )
    return res.data
  }

  async update(parameters: IUserCreate): Promise<IUserResponse> {
    const res = await this.axiosInstance.post<IUserResponse>(this.prefix + '/Update', parameters)
    return res.data
  }
  async changePassword(parameters: IUserChangePassword): Promise<IUserResponse> {
    const res = await this.axiosInstance.post<IUserResponse>(
      this.prefix + '/ChangePassword',
      parameters
    )
    return res.data
  }

  async remove(id: number): Promise<IResultModel> {
    const res = await this.axiosInstance.post<IResultModel>(this.prefix + '/Delete' + `?id=${id}`)
    return res.data
  }
  async verifyAdminRole(id: number): Promise<IResultModel> {
    const res = await this.axiosInstance.post<IResultModel>(
      this.prefix + '/VerifyAdminRole' + `?id=${id}`
    )
    return res.data
  }

  async updateGuarantorRequested(data: IUpdateGuarantor): Promise<IUserResponse> {
    const res = await this.axiosInstance.post<IUserResponse>(
      this.prefix + '/UpdateGuarantorRequested',
      data
    )
    return res.data
  }
}

export default UserRequest
