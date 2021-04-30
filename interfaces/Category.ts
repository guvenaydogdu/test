import { ICommon, IPagerInput, IResponse } from './Common'

interface ICategory extends ICommon {
  code: string
  parentCategory?: ICategory
  parentCategoryId: number
  nameTR: string
  nameEN: string
}

interface ISetConfig {
  id: number
  value: string
  languageCode: string
  configGroupId: number
}
type ICategoriesResponse = IResponse<ICategory[]>
type ICategoryResponse = IResponse<ICategory>

interface ICategoryPager extends IPagerInput {
  parentCategoryId: number | null
  includeParentCategory?: boolean
}

interface INewCategory {
  nameTR: string
  nameEN: string
  parentCategoryId?: number
}

interface IUpdateCategory {
  id: number
  nameTR: string
  nameEN: string
  parentCategoryId?: number
}
export type {
  ICategory,
  ICategoryPager,
  ISetConfig,
  ICategoriesResponse,
  ICategoryResponse,
  INewCategory,
  IUpdateCategory,
}
