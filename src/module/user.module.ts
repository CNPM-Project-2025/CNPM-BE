import { Module } from '@nestjs/common';
import { UserController } from '../controller/user/user.controller';
import { UserService } from '../service/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
