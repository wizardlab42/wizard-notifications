import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Throttle, ThrottlerGuard } from '@nestjs/throttler'
import { QuizDTO } from './dto/quiz.body.dto'
import { QuizService } from './quiz.service'

@ApiTags('Quiz')
@Controller('quiz')
export class QuizController {
  constructor(private readonly service: QuizService) {}

  @Post('/send')
  @ApiOperation({ summary: 'Send quiz results' })
  @ApiResponse({ status: 200, description: 'Quiz sent' })
  // @UseGuards(ThrottlerGuard)
  // @Throttle(2, 60)
  async send(@Body() body: QuizDTO) {
    return this.service.send(body)
  }
}
