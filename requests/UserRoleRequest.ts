import { IAddUserRole, IUserRoleResponse, IUserRolesResponse } from '../interfaces/UserRole'
import { BaseRequest } from './BaseRequest'

class UserRoleRequest extends BaseRequest {
  prefix = '/UserRole'

  async listByUserId(userId: number): Promise<IUserRolesResponse> {
    const res = await this.axiosInstance.get<IUserRolesResponse>(
      this.prefix + '/ListByUserId/' + userId
    )
    return res.data as IUserRolesResponse
  }

  async updateList(data: IAddUserRole): Promise<IUserRoleResponse> {
    const res = await this.axiosInstance.post<IUserRoleResponse>(this.prefix + '/UpdateList', data)
    return res.data
  }
}

export default UserRoleRequest
