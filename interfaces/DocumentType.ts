import { ICommon, IPagerInput, IResponse } from './Common'

interface IDocumentType extends ICommon {
  code: string
  nameTR: string
  nameEN: string
  forArkasUser: boolean
}

interface IDocumentTypePager extends IPagerInput {
  forArkasUser: boolean
}

type IDocumentTypesResponse = IResponse<IDocumentType[]>

export type { IDocumentType, IDocumentTypePager, IDocumentTypesResponse }
