import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GitLabModule } from './modules/gitlab/gitlab.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { UserController } from './modules/user/user.controller';
import { JenkinsController } from './modules/jenkins/jenkins.controller';
import { JenkinsService } from './modules/jenkins/jenkins.service';
import { JenkinsModule } from './modules/jenkins/jenkins.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as MySQL from './config/mysql';
import { Connection } from 'typeorm';

const typeOrm = TypeOrmModule.forRoot({
  type: 'mysql',
  host: MySQL.HOST,
  port: MySQL.PORT,
  username: MySQL.USER_NAME,
  password: MySQL.PWD,
  database: MySQL.DATABASE,
  // entities: [TestUser],
  autoLoadEntities: true,
  // synchronize: true, // 不能在生产环境下使用这个参数 true
});

@Module({
  imports: [GitLabModule, AuthModule, UserModule, JenkinsModule, typeOrm],
  controllers: [AppController, UserController, JenkinsController],
  providers: [AppService, JenkinsService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
