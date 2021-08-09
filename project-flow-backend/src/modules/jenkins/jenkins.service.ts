import { Injectable } from '@nestjs/common';
import { buildJenkins } from 'src/utils/jenkins';

@Injectable()
export class JenkinsService {
  /**
   * @description: 构建项目
   */
  async buildProject({
    type = 'h5',
    projectName,
    projectVersion,
    projectGitPath,
    branchName = 'master',
    buildPath = 'build',
    cache = true,
  }) {
    const callBack = await buildJenkins({
      type,
      job: 'fe-base-h5',
      params: {
        PROJECT_NAME: projectName,
        PROJECT_VERSION: projectVersion,
        PROJECT_GIT_PATH: projectGitPath,
        BRANCH_NAME: branchName,
        BUILD_PATH: buildPath,
        CACHE: cache,
      },
    });
    return callBack;
  }
}
