import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { corsConfig } from './config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: corsConfig,
    },
  })

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3000)
}
bootstrap()
