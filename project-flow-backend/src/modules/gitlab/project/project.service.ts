import { HttpService, Injectable } from '@nestjs/common';
import { gitlabBaseUrl } from 'src/utils/gitlab';
import { map } from 'rxjs/operators';

@Injectable()
export class ProjectService {
  constructor(private httpService: HttpService) {}

  /**
   * 获取用户 GitLab token
   * Resource owner password credentials flow（客户端用户密码验证授权）
   * 缺点：用户需要输入账号密码登入，所以使用 Web应用授权方式更好
   */
  async getUserToken({ username, password }): Promise<any> {
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
   * 获取项目列表
   */
  async getProjectList({ pageSize, pageNum, accessToken }): Promise<any> {
    console.log(
      `${gitlabBaseUrl}/projects?per_page=${pageSize}&page=${pageNum}&access_token=${accessToken}`,
    );

    const res = await this.httpService
      .get(
        `${gitlabBaseUrl}/api/v4/projects?per_page=${pageSize}&page=${pageNum}&access_token=${accessToken}`,
      )
      .pipe(map((resp) => resp.data))
      .toPromise();
    return res;
  }
}
