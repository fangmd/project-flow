import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GitLabModule } from './modules/gitlab/gitlab.module';

@Module({
  imports: [GitLabModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
