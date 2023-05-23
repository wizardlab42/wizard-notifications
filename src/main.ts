import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import * as basic_auth from 'express-basic-auth'
import * as SendPulse from 'sendpulse-api'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  })

  // nginx meme
  app.set('trust proxy', 1)

  const config = new DocumentBuilder()
    .setTitle('Wizard Notifications API')
    .setDescription('')
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

  app.setGlobalPrefix('api')

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

  const { SENDPULSE_ID, SENDPULSE_SECRET } = process.env
  SendPulse.init(SENDPULSE_ID, SENDPULSE_SECRET, '/tmp/', () => {
    SendPulse.listAddressBooks(console.log, 10, 0)
  })

  await app.listen(process.env.PORT || 3000)
}
bootstrap()
