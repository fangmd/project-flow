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
   * http://127.0.0.1:9000/oauth/authorize?client_id=5b5784110338ec07cd93a7c8ac4fb8aa831abd4ecb9eff851559c914fa1ef469&redirect_uri=http://127.0.0.1:3000/gitlab/getTokenByApp&response_type=code
   */
  @Get('getTokenByApp')
  async getTokenByApplications(@Req() request: Request) {
    const { code } = request.query;
    const data = await this.gitLabService.getTokenByApplications({ code });
    return { data };
  }
}
