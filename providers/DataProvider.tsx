import React, { useContext, createContext, FC, useEffect } from 'react'
import { ILanguage, ILanguagePager } from '../interfaces/Language'
import Requests from '../requests'

export const SET_SEARCH_DATA = 'SET_SEARCH_DATA'
export const SET_LOAD_TRACKING_OPEN = 'SET_LOAD_TRACKING_OPEN'
export const SET_LANGUAGES = 'SET_LANGUAGES'
export const SET_LOAD_TRACKING_CLOSE = 'SET_LOAD_TRACKING_CLOSE'
export const REMOVE_SEARCH_DATA = 'REMOVE_SEARCH_DATA'
export const SET_FORM_INITIAL_DATA = 'SET_FORM_INITIAL_DATA'
export const REMOVE_FORM_INITIAL_DATA = 'REMOVE_FORM_INITIAL_DATA'
type DataContextType = {
  globalState: {
    searchData: any
    trackingModalStatus: boolean
    languages?: ILanguage[] | null
    formInitalData?: any
  }
  dispatch: React.Dispatch<any>
}

const initialState = {
  searchData: null,
  trackingModalStatus: false,
  languages: null,
  formInitalData: null,
}
interface IAction {
  type: string
  payload: any
}

const reducer = (state: any, action: IAction) => {
  switch (action.type) {
    case SET_SEARCH_DATA:
      return {
        ...state,
        searchData: action.payload,
      }
    case REMOVE_SEARCH_DATA:
      return {
        ...state,
        searchData: null,
      }
    case SET_LOAD_TRACKING_OPEN:
      return {
        ...state,
        trackingModalStatus: true,
      }

    case SET_LOAD_TRACKING_CLOSE:
      return {
        ...state,
        trackingModalStatus: false,
      }
    case SET_LANGUAGES:
      return {
        ...state,
        languages: action.payload,
      }
    case SET_FORM_INITIAL_DATA:
      return {
        ...state,
        formInitalData: action.payload,
      }
    case REMOVE_FORM_INITIAL_DATA:
      return {
        ...state,
        formInitalData: null,
      }
  }
  return state
}

const languagePagerModel: ILanguagePager = {
  pageNumber: 1,
  pageSize: 10,
  sortColumn: 'Id',
  sortDescending: true,
}

const DataContext = createContext<DataContextType>({
  dispatch: () => {
    console.log('test')
  },
  globalState: initialState,
})
export const DataProvider: FC = ({ children }) => {
  const request = Requests()
  const [globalState, dispatch] = React.useReducer(reducer, initialState)

  useEffect(() => {
    const getLanguage = () => {
      if (globalState.languages == null) {
        request.LanguageRequest.getList(languagePagerModel)
          .then((res) => {
            if (res.isSuccess) {
              dispatch({ type: SET_LANGUAGES, payload: res.data })
            }
          })
          .catch((err) => console.log(err))
      }
    }
    getLanguage()
  }, [])

  return (
    <DataContext.Provider
      value={{
        globalState,
        dispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useDataContext = () => {
  return useContext(DataContext)
}

/*




{
    "transportTypeId": 3,
    "origin": {
        "locationId": 282625,
        "locationTypeId": 14,
        "port": null,
        "town": "Seaca De Camp",
        "city": "Dolj",
        "country": "Romania",
        "countryLocationId": 281395,
        "xCoordinate": 0,
        "yCoordinate": 0
    },
    "destination": {
        "locationId": 306915,
        "locationTypeId": 14,
        "port": null,
        "town": "İskenderun",
        "city": "Hatay",
        "country": "Türkiye",
        "countryLocationId": 306450,
        "xCoordinate": 0,
        "yCoordinate": 0
    },
    "dueDate": "2021-04-15",
    "transportTypeContainerId": 2,
    "ids":[6, 8, 7]
}


















*/
