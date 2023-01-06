import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { QuizService } from './quiz.service'

@ApiTags('Quiz')
@Controller('quiz')
export class QuizController {
  constructor(private readonly service: QuizService) {}
}
