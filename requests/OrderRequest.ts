import {
  IOrderCreate,
  IOrderPager,
  IOrdersResponse,
  IOrderResponse,
  IApproveOrder,
  IRejectOrder,
} from '../interfaces/Order'
import { BaseRequest } from './BaseRequest'

class OrderRequest extends BaseRequest {
  prefix = '/Order'

  async create(data: IOrderCreate): Promise<any> {
    const res = await this.axiosInstance.post<any>(this.prefix + '/Create', data)
    return res.data
  }

  async getList(pager: IOrderPager): Promise<IOrdersResponse> {
    const res = await this.axiosInstance.post<IOrdersResponse>(this.prefix + '/GetList', pager)
    return res.data
  }

  async approveOrder(data: IApproveOrder): Promise<IOrderResponse> {
    const res = await this.axiosInstance.post<IOrderResponse>(this.prefix + '/ApproveOrder', data)
    return res.data
  }

  async rejectOrder(data: IRejectOrder): Promise<IOrderResponse> {
    const res = await this.axiosInstance.post<IOrderResponse>(this.prefix + '/RejectOrder', data)
    return res.data
  }
}

export default OrderRequest
