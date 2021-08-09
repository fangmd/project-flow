import { ProjectService } from './../gitlab/project/project.service';
import { GitLabService } from './../gitlab/gitlab.service';
import { JenkinsService } from './jenkins.service';
import { Body, Controller, Post } from '@nestjs/common';
import { responseError, responseSuccess } from 'src/utils/response';
import { SERVER_ERROR } from 'src/constants';

@Controller('jenkins')
export class JenkinsController {
  constructor(private readonly jenkinsService: JenkinsService, private readonly projectService: ProjectService) {}
  @Post('createJob')
  async createJob(@Body() params: any) {
    const { accessToken, projectId, buildPath } = params;
    const projectResult = await this.projectService.getProject({ accessToken, projectId });
    if (!projectResult) {
      return responseError({ code: SERVER_ERROR.code, msg: SERVER_ERROR.msg });
    }
    let projectGitPath = projectResult.http_url_to_repo.replace('http://', `http://oauth2:${accessToken}@`);
    projectGitPath = projectResult.http_url_to_repo.replace('192.168.79.130', `192.168.79.130:9000`); //TODO: opt, ip 不要写死
    console.log({
      projectName: projectResult.name,
      projectVersion: 1,
      projectGitPath,
      buildPath: buildPath,
    });
    const buildResult = await this.jenkinsService.buildProject({
      projectName: projectResult.name,
      projectVersion: 1,
      projectGitPath,
      buildPath: buildPath,
    });

    return responseSuccess(buildResult);
  }
}
