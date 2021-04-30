import { ICommon, IPagerInput, IResponse } from './Common'

interface ILanguage extends ICommon {
  code: string
  name: string
}

interface IAddLanguage {
  code: string
  name: string
}

type ILanguagePager = IPagerInput

type ILanguageResponse = IResponse<ILanguage>
type ILanguagesResponse = IResponse<ILanguage[]>

export type { ILanguage, ILanguagePager, ILanguageResponse, ILanguagesResponse, IAddLanguage }
