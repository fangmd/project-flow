import { UserService } from './user.service';
import { AuthService } from './../auth/auth.service';
import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { responseSuccess } from 'src/utils/response';
import { Request } from 'express';
import { JwtAuthGuard } from '../../guard/jwt/jwt_auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  /**
   * JWT验证 - Step 1: 用户请求登录
   */
  @Post('login')
  async login(@Body() loginParams: any) {
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(loginParams.username, loginParams.password);
    if (!authResult.isSuccess) {
      return authResult;
    }
    return this.authService.certificate(authResult);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserInfo(@Req() request: Request) {
    // this.userService.findOne()
    return responseSuccess();
  }
}
