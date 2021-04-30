import { BaseRequest } from './BaseRequest'
import { IAuthResponse, ILogin, IRegister, IRegisterResponse, IResetPass } from '../interfaces/Auth'
import { IResultModel } from '../interfaces/Common'

class AuthRequest extends BaseRequest {
  prefix = '/Auth'

  async login(data: ILogin): Promise<IAuthResponse> {
    const res = await this.axiosInstance.post<IAuthResponse>(this.prefix + '/Login', data)
    return res.data
  }

  async register(data: IRegister): Promise<IRegisterResponse> {
    const res = await this.axiosInstance.post<IRegisterResponse>(this.prefix + '/Register', data)
    return res.data
  }

  async googleLogin(token: string): Promise<IAuthResponse> {
    const res = await this.axiosInstance.post<IAuthResponse>(this.prefix + '/GoogleLogin', {
      token,
    })
    return res.data
  }

  async forgotPassword(data: IResetPass): Promise<IResultModel> {
    const res = await this.axiosInstance.post<IResultModel>(this.prefix + '/ForgotPassword', data)
    return res.data
  }
}

export default AuthRequest
