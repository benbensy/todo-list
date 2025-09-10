import { Module } from '@nestjs/common'
import HelloController from 'src/controllers/hello.controller'
import { HelloService } from 'src/services/hello.service'

@Module({
  controllers: [HelloController],
  providers: [HelloService],
})
export default class HelloModule {}
