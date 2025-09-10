import { Controller, Get } from '@nestjs/common'
import { HelloService } from 'src/services/hello.service'

@Controller()
export default class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get('/greeting')
  greeting() {
    return this.helloService.getHello()
  }
}
