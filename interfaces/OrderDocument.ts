import { ICommon, IPagerInput, IResponse } from './Common'
import { IDocumentType } from './DocumentType'
import { IOrder } from './Order'

interface IOrderDocument extends ICommon {
  code: string
  order?: IOrder
  orderId: number
  documentType?: IDocumentType
  documentTypeId?: number
  name: number
  path: number
  extension: number
}

interface IAddDocument {
  orderId: number
  documentTypeId: number
  fileName: string
  fileBase64String: string
}

interface IOrderDocumentPager extends IPagerInput {
  orderId: number
}

type IOrderDocumentResponse = IResponse<IOrderDocument>

type IOrderDocumentsResponse = IResponse<IOrderDocument[]>

export type {
  IOrderDocument,
  IOrderDocumentPager,
  IOrderDocumentResponse,
  IOrderDocumentsResponse,
  IAddDocument,
}
