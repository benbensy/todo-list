import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import AuthController from './controllers/auth.controller'
import AuthModule from './modules/auth.module'
import PrismaModule from './modules/prisma.module'

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
