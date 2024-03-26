import { Injectable } from "@nestjs/common";
import CreateUserDto from "src/app/user/dto/createUser.dto";
import UserDB from "src/biz/mysql/user/userDB";
import { CustomInternalServerErrorExceptionApiG } from "src/http/apiGee/http.apiGee.exception";
import ChangePasswordDto from "src/app/user/dto/changePassword.dto";
import { AppRedisService } from "src/biz/redis/redis.service";
import { UserInRedis } from "src/biz/redis/dto/userRedis.dto";

@Injectable()
export default class UserBizService {
  constructor(
    private readonly userDb: UserDB,
    private readonly appRedisService: AppRedisService
  ) {}

  async createUser(
    createUserParams: CreateUserDto,
    apiCode: string
  ): Promise<any> {
    try {
      return await this.userDb.createUser(createUserParams);
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }

  async changePassword(
    changePasswordParams: ChangePasswordDto,
    apiCode: string
  ): Promise<any> {
    try {
      return await this.userDb.changePassword(changePasswordParams);
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }

  async getUserByEmail(email: string, apiCode: string): Promise<any> {
    try {
      return await this.userDb.getUserByEmail(email);
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }
}
