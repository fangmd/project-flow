import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { GitLabService } from './gitlab.service';

@Controller('gitlab')
export class GitLabController {
  constructor(private readonly gitLabService: GitLabService) {}

  @Get('client-auth')
  async getHello() {
    const data = await this.gitLabService.getUserToken({
      username: 'root',
      password: 'root0224',
    });
    return { data };
  }

  /**
   * 在游览器中输入, 开始授权
   * http://192.168.79.130:9000/oauth/authorize?client_id=63b71211d3f555a04e156770c4ae9093d8b9124bfa01f9981ab7cf4688c6f3bd&redirect_uri=http://127.0.0.1:3000/gitlab/getTokenByApp&response_type=code
   */
  @Get('getTokenByApp')
  async getTokenByApplications(@Req() request: Request) {
    const { code } = request.query;
    const data = await this.gitLabService.getTokenByApplications({ code });
    return { data };
  }
}
