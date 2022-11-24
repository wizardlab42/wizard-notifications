import { Injectable } from '@nestjs/common'

@Injectable()
export class FeedbackService {
  send(body: any) {
    return { status: true }
  }
}
