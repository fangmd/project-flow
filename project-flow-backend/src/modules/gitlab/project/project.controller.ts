import { ProjectService } from './project.service';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { responseSuccess } from 'src/utils/response';

@Controller('gitlab/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  /**
   * 获取所有项目
   */
  @Get('list')
  async getProjectList(@Req() request: Request) {
    const { pageSize, pageNum, accessToken } = request.query;
    const projectList = await this.projectService.getProjectList({
      pageSize,
      pageNum,
      accessToken,
    });
    return { data: projectList };
  }

  /**
   * 获取当个项目信息
   */
  @Get()
  async getProject(@Req() request: Request) {
    const { projectId, accessToken } = request.query;
    const projectList = await this.projectService.getProject({
      projectId,
      accessToken,
    });
    return responseSuccess({ data: projectList });
  }
}
