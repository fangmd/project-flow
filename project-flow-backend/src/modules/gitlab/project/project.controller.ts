import { ProjectService } from './project.service';
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('gitlab/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('getProjectList')
  async getProjectList(@Req() request: Request) {
    const { pageSize, pageNum, accessToken } = request.query;
    const projectList = await this.projectService.getProjectList({
      pageSize,
      pageNum,
      accessToken,
    });
    return { data: projectList };
  }
}
