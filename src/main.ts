import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ExcludeNullInterceptor } from './interceptors/exclude-null.interceptor'
import { TimeoutInterceptor } from './interceptors/timeout.interceptor'
import { TransformInterceptor } from './interceptors/transform.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalInterceptors(
    new ExcludeNullInterceptor(),
    new TimeoutInterceptor(),
    new TransformInterceptor()
  )

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
