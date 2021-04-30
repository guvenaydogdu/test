import { IDocumentTypePager, IDocumentTypesResponse } from '../interfaces/DocumentType'
import { BaseRequest } from './BaseRequest'

class DocumentTypeRequest extends BaseRequest {
  prefix = '/DocumentType'

  async getList(paramaters: IDocumentTypePager): Promise<IDocumentTypesResponse> {
    const res = await this.axiosInstance.post<IDocumentTypesResponse>(
      this.prefix + '/GetList',
      paramaters
    )
    return res.data as IDocumentTypesResponse
  }
}

export default DocumentTypeRequest
