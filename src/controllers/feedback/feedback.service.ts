import { MESSAGE_NOT_SENT } from '@/errors/index'
import { FeedbackBodyDto } from './dto/feedback.body.dto'
import { Injectable } from '@nestjs/common'
import { send_message } from '@/utils/utils.telegram'
import { $throw_error } from '@/utils/utils.errors'

@Injectable()
export class FeedbackService {
  async send(body: FeedbackBodyDto, ip: string) {
    const response = await send_message(
      `*${body.name} - ${ip}*\n*Contacts:*\nEmail: ${body.email}\nPhone:${body.phone}\n\n*Message:*\n${body.message}`,
      process.env.CHAT_ID,
    )
    if (!response.status) $throw_error(MESSAGE_NOT_SENT)
    return { status: true }
  }
}
