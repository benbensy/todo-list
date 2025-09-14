import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import AuthController from './controllers/auth.controller'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import AuthModule from './modules/auth.module'
import { CacheModule } from './modules/cache.module'
import PrismaModule from './modules/prisma.module'
import ProfileModule from './modules/profile.module'
import UsersModule from './modules/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    ProfileModule,
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,

    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
