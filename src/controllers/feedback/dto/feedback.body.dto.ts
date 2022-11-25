import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsMobilePhone, IsString, Length } from 'class-validator'
export class FeedbackBodyDto {
  @IsString()
  @Length(1, 64)
  @ApiProperty({ description: 'Fullname' })
  name: string

  @IsString()
  @IsEmail()
  @Length(6, 96)
  @ApiProperty({ description: 'Email', example: 'test@wizardlab.com' })
  email: string

  @IsString()
  @Length(4, 512)
  @ApiProperty({ description: 'Message', example: 'Any message' })
  message: string

  @IsString()
  @IsMobilePhone()
  @Length(4, 32)
  @ApiProperty({ description: 'Phone', example: '(555) 555-1234' })
  phone: string
}
