import { ICommon, IResponse } from './Common'
import { IRole } from './Role'
import { IUser } from './User'

interface IUserRole extends ICommon {
  code: string
  user?: IUser
  userId: number
  role?: IRole
  roleId: number
}

interface IAddUserRole {
  userId: number
  roleIdList: number[]
}

type IUserRoleResponse = IResponse<IUserRole>
type IUserRolesResponse = IResponse<IUserRole[]>

export type { IUserRole, IUserRoleResponse, IUserRolesResponse, IAddUserRole }
