import { IsString, Length } from 'class-validator'
export class FeedbackBodyDto {
  @IsString()
  @Length(1, 64)
  name: string

  @IsString()
  @Length(6, 96)
  email: string

  @IsString()
  @Length(4, 512)
  message: string

  @IsString()
  @Length(4, 32)
  phone: string
}
