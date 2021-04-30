interface IResultModel {
  isSuccess: boolean
  message?: string
  messages?: IResultMessage[]
}

interface IResultMessage {
  message: string
  code?: string
}

interface IPagerInput {
  pageNumber: number
  pageSize: number
  searchText?: string
  sortColumn?: string
  sortDescending?: boolean
  isActive?: boolean
}

interface IResponse<T> {
  data: T
  hasNextPage?: boolean
  hasPreviousPage?: boolean
  isFirstPage?: boolean
  isLastPage?: boolean
  isSuccess: boolean
  message: string | null
  messages: IResultMessage[]
  pageCount?: number
  pageNumber?: number
  totalItemCount?: number
}

interface ICommon {
  id: number
  uniqId: string
  createTime: string
  updateTime?: string | null
  isActive: boolean
  deletedTime?: string | null
  isDeleted: boolean
  position: number
  integrationId: string
}

export type { IResultModel, IPagerInput, IResponse, ICommon }
