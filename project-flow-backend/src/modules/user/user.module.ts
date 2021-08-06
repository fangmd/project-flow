import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserService],
  exports: [UserService],
  // controllers: [UserController], // 因为用到了 AuthService, 所以放到 AppModule 中引入
})
export class UserModule {}
