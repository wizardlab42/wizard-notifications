import { QuizDTO } from './dto/quiz.body.dto'
import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { send_message } from '@/utils/utils.telegram'

@Injectable()
export class QuizService {
  async send(body: QuizDTO, mail: MailerService) {
    // const t = await mail.sendMail({
    //   to: 'ovip22@gmail.com',
    //   from: 'hey@roobinium.ca',
    //   subject: 'Wizard',
    //   text: 'Hello world!',
    // })
    const formatted = body.questions.map((q) => {
      const parsed = Array.isArray(q.answer) ? q.answer.join(', ') : q.answer
      return `*${q.question}*: \n\`${parsed}\``
    })
    await send_message(
      `*Quiz Result*:\n${formatted.join('\n\n')}\n\nEmail: *${body.email}*`,
      process.env.CHAT_ID,
    )
  }
}
