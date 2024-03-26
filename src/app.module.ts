import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  Scope,
} from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { RedisModule } from "nestjs-redis";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TableModule } from "./app/table/table.module";
import { RestaurantModule } from "./app/restaurant/restaurant.module";
import { UserModule } from "./app/user/user.module";
import MySQLConfig from "./biz/mysql/builder/config";
import MySQLBuilder from "./biz/mysql/builder/mysqlBuilder";
import { AppRedisService } from "./biz/redis/redis.service";
import { AppConfigModule } from "./config/configuration.module";
import { AppConfigService } from "./config/configuration.service";
import { LoggerInterceptor } from "./interceptors/logger.interceptor";
import { ReservationModule } from "./app/reservation/reservation.module";

@Module({
  imports: [
    AppConfigModule,
    RestaurantModule,
    ReservationModule,
    TableModule,
    UserModule,
    RedisModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (appConfigService: AppConfigService) =>
        appConfigService.redis,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppRedisService,
    AppService,
    MySQLBuilder,
    MySQLConfig,
    {
      /**
       * so nest will by itself inject AppUserService in LoggerInterceptor
       * LoggerInterceptor with this configuration is global interceptor
       */
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
