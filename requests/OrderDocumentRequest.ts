import { IResultModel } from '../interfaces/Common'
import {
  IAddDocument,
  IOrderDocumentPager,
  IOrderDocumentResponse,
  IOrderDocumentsResponse,
} from '../interfaces/OrderDocument'
import { BaseRequest } from './BaseRequest'

class OrderDocumentRequest extends BaseRequest {
  prefix = '/OrderDocument'

  async getList(paramaters: IOrderDocumentPager): Promise<IOrderDocumentsResponse> {
    const res = await this.axiosInstance.post<IOrderDocumentsResponse>(
      this.prefix + '/GetList',
      paramaters
    )
    return res.data as IOrderDocumentsResponse
  }

  async upload(data: IAddDocument): Promise<IOrderDocumentResponse> {
    const res = await this.axiosInstance.post<IOrderDocumentResponse>(this.prefix + '/Upload', data)
    return res.data
  }

  async delete(documentId: number): Promise<IResultModel> {
    const res = await this.axiosInstance.get<IResultModel>(
      this.prefix + '/Delete' + '?id=' + documentId
    )
    return res.data
  }
}

export default OrderDocumentRequest
