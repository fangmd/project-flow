import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // private readonly users = [
  //   {
  //     userId: 1,
  //     username: 'fang',
  //     password: '11111111',
  //   },
  //   {
  //     userId: 2,
  //     username: 'maria',
  //     password: 'guess',
  //   },
  // ];

  // async findOne(username: string): Promise<any | undefined> {
  //   return this.users.find((user) => user.username === username);
  // }

  findOne(username: string, password?: string): Promise<User> {
    const findOpt: any = { username };
    if (password) {
      findOpt.password = password;
    }
    return this.usersRepository.findOne(findOpt);
  }

  add(username: string, password: string): Promise<User> {
    const user = new User();
    user.username = username;
    user.password = password;
    return this.usersRepository.save(user);
  }
}
