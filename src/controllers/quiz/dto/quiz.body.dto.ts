import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator'

class Question {
  @IsString()
  @IsNotEmpty()
  question: string

  @IsString({ each: true })
  answer: string | string[]
}

export class QuizDTO {
  @ValidateNested()
  @IsDefined()
  @Type(() => Array<Question>)
  questions: Question[]

  @IsEmail()
  @IsString()
  @ApiProperty({ description: 'Email', example: 'test@wizardlab.com' })
  email: string
}
