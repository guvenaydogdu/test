import { ICommon, IPagerInput, IResponse } from './Common'

interface IConfigGroup extends ICommon {
  name?: string
  code: string
}

type IConfigGroupsResponse = IResponse<IConfigGroup[]>
type IConfigGroupResponse = IResponse<IConfigGroup>

type IConfigGroupPager = IPagerInput

export type { IConfigGroup, IConfigGroupResponse, IConfigGroupsResponse, IConfigGroupPager }
