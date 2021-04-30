import { ICommon } from './Common'
import { ILocationType } from './LocationType'

interface ILocation extends ICommon {
  code?: string
  locationType: ILocationType
  locationTypeId: number
  parentLocation: any
  parentLocationId: number
  name?: string
  unCode?: string
  xCoordinate: number
  yCoordinate: number
}

export type { ILocation }
