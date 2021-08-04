import { HttpService, Injectable } from '@nestjs/common';
import { gitlabBaseUrl } from 'src/utils/gitlab';
import { map } from 'rxjs/operators';
import { APP_ID, CLIENT_SECRET, REDIRECT_URI } from 'src/config/gitLab';

@Injectable()
export class GitLabService {
  constructor(private httpService: HttpService) {}

  /**
   * 获取用户 GitLab token
   * Resource owner password credentials flow（客户端用户密码验证授权）
   * 缺点：用户需要输入账号密码登入，所以使用 Web应用授权方式更好
   */
  async getUserToken({ username, password }): Promise<string> {
    const res = await this.httpService
      .post(`${gitlabBaseUrl}/oauth/token`, {
        grant_type: 'password',
        username,
        password,
      })
      .pipe(map((resp) => resp.data))
      .toPromise();

    return res;
  }

  /**
   * Web application flow（Web 应用程序授权）
   */
  async getTokenByApplications({ code }): Promise<string> {
    const res = await this.httpService
      .post(`${gitlabBaseUrl}/oauth/token`, {
        grant_type: 'authorization_code',
        client_id: APP_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI,
      })
      .pipe(map((resp) => resp.data))
      .toPromise();

    return res;
  }
}
