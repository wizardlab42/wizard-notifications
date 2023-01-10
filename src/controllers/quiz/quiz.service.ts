import { QuizDTO } from './dto/quiz.body.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class QuizService {
  send(body: QuizDTO) {
    console.log(body)
  }
}
