import { QuizModule } from './controllers/quiz/quiz.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core'
import { ResponseInterceptor } from './interceptors/interceptor.response'
import { FeedbackModule } from './controllers/feedback/feedback.module'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 30,
    }),
    FeedbackModule,
    QuizModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
