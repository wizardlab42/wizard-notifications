import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import * as basic_auth from 'express-basic-auth'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  })

  // nginx meme
  app.set('trust proxy', 1)

  const config = new DocumentBuilder()
    .setTitle('Документация по API')
    .setDescription('Refferency Requests API')
    .setVersion('1.0')
    .build()

  app.use(
    ['/docs', '/docs-json'],
    basic_auth({
      challenge: true,
      users: {
        dev: 'xaf1337@1337!',
      },
    }),
  )

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )

  await app.listen(process.env.PORT || 3000)
}
bootstrap()
