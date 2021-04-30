import { BaseRequest } from './BaseRequest'
import { IResultModel } from '../interfaces/Common'

class ForgotPasswordRequest extends BaseRequest {
  prefix = '/ForgotPasswordRequest'

  async checkActivationCode(token: any): Promise<IResultModel> {
    const res = await this.axiosInstance.post<IResultModel>(
      this.prefix + '/CheckAktivationCode',
      token
    )
    return res.data
  }

  async changePassword(
    activationCode: any,
    password: string,
    passwordAgain: string
  ): Promise<IResultModel> {
    const res = await this.axiosInstance.post<IResultModel>(this.prefix + '/ChangePassword', {
      activationCode,
      password,
      passwordAgain,
    })
    return res.data
  }
}

export default ForgotPasswordRequest
