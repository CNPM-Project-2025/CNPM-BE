import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user-dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user-dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Roles } from './decorator/roles.decorator';
import { stat } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const hashPassword = await this.hashPassword(registerUserDto.password);

    return await this.userRepository.save({
      ...registerUserDto,
      refresh_token: 'refresh_token_string',
      password: hashPassword,
    });
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });
    if (!user) {
      throw new HttpException('Email is not exist', HttpStatus.UNAUTHORIZED);
    }
    const checkPass = bcrypt.compareSync(loginUserDto.password, user.password);
    if (!checkPass) {
      throw new HttpException(
        'Password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }
    //generate access token and refresh token
    const payload = { id: user.id, email: user.email };
    return {
      ...await this.generateToken(payload),
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        roles: user.roles,
        avatar: user.avatar,
        status: user.status,
        created_at: user.created_at,
        created_update: user.created_update,
      },
    };
  }

  async refreshToken(refresh_token: string): Promise<any> {
    try {
      const verify = await this.jwtService.verifyAsync(refresh_token, {
        secret: this.configService.get<string>('SECRET'),
      });
      const checkExistToken = await this.userRepository.findOneBy({
        email: verify.email,
        refresh_token,
      });
      if (checkExistToken) {
        const auth = await this.generateToken({ id: verify.id, email: verify.email });
        return {
          access_token: auth.access_token,
          refresh_token: auth.refresh_token,
          user: {
            id: checkExistToken.id,
            first_name: checkExistToken.first_name,
            last_name: checkExistToken.last_name,
            email: checkExistToken.email,
            phone: checkExistToken.phone,
            roles: checkExistToken.roles,
            avatar: checkExistToken.avatar,
            status: checkExistToken.status,
            created_at: checkExistToken.created_at,
            created_update: checkExistToken.created_update,
          },
        };
      } else {
        throw new HttpException(
          'Refresh token is not validdd',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      console.error('Refresh token error:', error.message);
      throw new HttpException(
        'Refresh token is not valid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async generateToken(payload: { id: number; email: string }) {
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('SECRET'),
      expiresIn: this.configService.get<string>('EXP_IN_REFRESH_TOKEN') || '7d',
    });
    console.log(this.configService.get<string>('EXP_IN_REFRESH_TOKEN'));
    await this.userRepository.update(
      { email: payload.email },
      { refresh_token: refresh_token },
    );

    // lấy user từ database

    return { access_token, refresh_token };
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }
}
