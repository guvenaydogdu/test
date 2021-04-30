import { ICommon, IPagerInput, IResponse } from './Common'

interface ISlider extends ICommon {
  name?: string
  imagePath?: string
  description?: string
  languageCode: string
}

interface INewSlider {
  name?: string
  description?: string
  fileName: string
  fileBase64String: string
  position: number
  languageCode: string
}

interface IUpdateSlider {
  id: number
  name?: string
  position: number
  description?: string
  languageCode: string
  fileName?: string
  fileBase64String?: string
}

type ISliderResponse = IResponse<ISlider>
type ISlidersResponse = IResponse<ISlider[]>

type ISliderPager = IPagerInput

export type { ISlider, INewSlider, IUpdateSlider, ISliderResponse, ISlidersResponse, ISliderPager }
