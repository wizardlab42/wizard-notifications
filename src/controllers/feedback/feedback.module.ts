import { FeedbackService } from './feedback.service'
import { FeedbackController } from './feedback.controller'
import { Module } from '@nestjs/common'

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService],
  imports: [],
})
export class FeedbackModule {}
