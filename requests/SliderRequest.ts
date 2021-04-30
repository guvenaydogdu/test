import { BaseRequest } from './BaseRequest'
import {
  INewSlider,
  IUpdateSlider,
  ISliderResponse,
  ISlidersResponse,
  ISliderPager,
} from '../interfaces/Slider'
import { IResultModel } from '../interfaces/Common'

class SliderRequest extends BaseRequest {
  prefix = '/Slider'

  async insert(parameters: INewSlider): Promise<ISliderResponse> {
    const res = await this.axiosInstance.post<ISliderResponse>(this.prefix + '/Insert', parameters)
    return res.data
  }

  async update(parameters: IUpdateSlider): Promise<ISliderResponse> {
    const res = await this.axiosInstance.post<ISliderResponse>(this.prefix + '/Update', parameters)
    return res.data
  }

  async remove(id: number): Promise<IResultModel> {
    const res = await this.axiosInstance.get<IResultModel>(this.prefix + '/Delete' + `?id=${id}`)
    return res.data
  }

  async getList(parameters: ISliderPager): Promise<ISlidersResponse> {
    const res = await this.axiosInstance.post<ISlidersResponse>(
      this.prefix + '/GetList',
      parameters
    )
    return res.data
  }

  async get(id: number): Promise<ISliderResponse> {
    const res = await this.axiosInstance.get<ISliderResponse>(this.prefix + '/Get' + `?id=${id}`)
    return res.data
  }
}

export default SliderRequest
