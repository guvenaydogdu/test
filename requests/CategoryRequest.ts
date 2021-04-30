import {
  ICategoriesResponse,
  ICategoryPager,
  ICategoryResponse,
  INewCategory,
  IUpdateCategory,
} from '../interfaces/Category'
import { BaseRequest } from './BaseRequest'

class CategoryRequest extends BaseRequest {
  prefix = '/Category'

  async insert(parameters: INewCategory): Promise<ICategoryResponse> {
    const res = await this.axiosInstance.post<ICategoryResponse>(
      this.prefix + '/Create',
      parameters
    )
    return res.data
  }

  async update(parameters: IUpdateCategory): Promise<ICategoryResponse> {
    const res = await this.axiosInstance.post<ICategoryResponse>(
      this.prefix + '/Update',
      parameters
    )
    return res.data
  }

  async getList(parameters: ICategoryPager): Promise<ICategoriesResponse> {
    const res = await this.axiosInstance.post<ICategoriesResponse>(
      this.prefix + '/GetList',
      parameters
    )
    return res.data
  }
}

export default CategoryRequest
