import { QuizDTO } from './dto/quiz.body.dto'
import { Injectable } from '@nestjs/common'
import { send_message } from '@/utils/utils.telegram'
import * as SendPulse from 'sendpulse-api'

@Injectable()
export class QuizService {
  async send(body: QuizDTO) {
    const formatted = body.questions.map((q) => {
      const parsed = Array.isArray(q.answer) ? q.answer.join(', ') : q.answer
      return `*${q.question}*: \n\`${parsed}\``
    })
    await send_message(
      `*Quiz Result*:\n${formatted.join('\n\n')}\n\nEmail: *${body.email}*`,
      process.env.CHAT_ID,
    )
    const customTemplate = `Quiz Result:\n${formatted.join('\n\n')}`.replaceAll(
      '\n',
      '<br/>',
    )
    // const buff = Buffer.alloc(customTemplate.length, customTemplate)
    SendPulse.smtpSendMail(
      () => {
        // ...
      },
      {
        html: customTemplate,
        text: body.email,
        subject: 'Quiz',
        from: {
          name: `Customer - ${body.email}`,
          email: 'hey@roobinium.ca',
        },
        to: [
          {
            name: 'Roobinium',
            email: 'hey@roobinium.ca',
          },
        ],
      },
    )
  }
}
