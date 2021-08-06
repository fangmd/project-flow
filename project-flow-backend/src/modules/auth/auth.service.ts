import { HttpResponse, responseSuccess } from './../../utils/response';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ACCOUNT_OR_PWD_ERROR } from 'src/constants';
import { responseError } from 'src/utils/response';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private readonly jwtService: JwtService) {}

  /**
   * 检查用户名和密码是否正确
   * JWT验证 - Step 2: 校验用户信息
   */
  async validateUser(username: string, pass: string): Promise<HttpResponse> {
    console.log('JWT验证 - Step 2: 校验用户信息');
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return responseSuccess(result);
    }
    return responseError({
      code: ACCOUNT_OR_PWD_ERROR.code,
      msg: ACCOUNT_OR_PWD_ERROR.msg,
    });
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: any): Promise<HttpResponse> {
    const payload = {
      username: user.username,
      sub: user.userId,
      realName: user.realName,
      role: user.role,
    };
    console.log('JWT验证 - Step 3: 处理 jwt 签证');
    try {
      const token = this.jwtService.sign(payload);
      return responseSuccess(token, '登录成功');
    } catch (error) {
      return responseError({
        code: ACCOUNT_OR_PWD_ERROR.code,
        msg: ACCOUNT_OR_PWD_ERROR.msg,
      });
    }
  }
}
