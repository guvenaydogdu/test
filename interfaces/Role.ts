import { ICommon, IPagerInput, IResponse } from './Common'

interface IRole extends ICommon {
  name: string
  code: string
}
type IRolePager = IPagerInput

type IRoleResponse = IResponse<IRole>
type IRolesResponse = IResponse<IRole[]>

export type { IRole, IRolePager, IRoleResponse, IRolesResponse }
