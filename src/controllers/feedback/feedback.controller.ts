import { FeedbackService } from './feedback.service'
import { Controller, Body, Post } from '@nestjs/common'
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger'
import { FeedbackBodyDto } from './dto/feedback.body.dto'

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly service: FeedbackService) {}

  @Post('/send')
  @ApiOperation({ summary: 'Send feedback' })
  @ApiResponse({ status: 200, description: 'Feedback sent' })
  async sendFeedback(@Body() body: FeedbackBodyDto) {
    return this.service.send(body)
  }
}
