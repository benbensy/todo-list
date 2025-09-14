import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import AuthController from 'src/controllers/auth.controller'
import AuthService from 'src/services/auth.service'
import { JwtStrategy } from 'src/services/jwt.strategy'
import { LocalStrategy } from 'src/services/local.strategy'
import { PasswordService } from 'src/services/password.service'
import UsersModule from './users.module'

@Global()
@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          secret: config.get('JWT_SECRET'),
          signOptions: { expiresIn: '7d' },
        }
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, PasswordService],
  exports: [AuthService],
})
export default class AuthModule {}
