//import { ISearchFormData } from '../components/HomePage/GLSearchBar'
import {
  IAutoCompleteSearchResponse,
  INewSearch,
  ITransportSearchResponse,
} from '../interfaces/Search'

import { BaseRequest } from './BaseRequest'

class SearchRequest extends BaseRequest {
  prefix = '/Search'

  async autoCompleteSearch(searchProps: INewSearch): Promise<IAutoCompleteSearchResponse> {
    const res = await this.axiosInstance.post<IAutoCompleteSearchResponse>(
      this.prefix + '/AutoCompleteSearch',
      searchProps
    )
    return res.data
  }

  async transportSearch(searchData: any): Promise<ITransportSearchResponse> {
    const res = await this.axiosInstance.post<ITransportSearchResponse>(
      this.prefix + '/TransportSearch',
      searchData
    )
    return res.data
  }
}

export default SearchRequest
