import { ProjectService } from './project/project.service';
import { ProjectController } from './project/project.controller';
import { GitLabService } from './gitlab.service';
import { HttpModule, Module } from '@nestjs/common';
import { GitLabController } from './gitlab.controller';

@Module({
  imports: [HttpModule],
  controllers: [GitLabController, ProjectController],
  providers: [GitLabService, ProjectService],
  exports: [GitLabService, ProjectService],
})
export class GitLabModule {}
