import { GitLabModule } from './../gitlab/gitlab.module';
import { JenkinsService } from './jenkins.service';
import { JenkinsController } from './jenkins.controller';
import { Module } from '@nestjs/common';
import { GitLabService } from '../gitlab/gitlab.service';

@Module({
  imports: [GitLabModule],
  controllers: [JenkinsController],
  providers: [JenkinsService],
})
export class JenkinsModule {}
