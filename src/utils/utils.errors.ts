import { HttpException } from '@nestjs/common'

interface IErrorGenerator {
  code: number
  message: string
  data?: any
}

interface IErrorGeneratorReturn {
  status: boolean
  code: number
  message: string
  data?: any
}

export function $throw_error(code: IErrorGenerator): IErrorGeneratorReturn {
  throw new HttpException(
    {
      status: false,
      ...code,
    },
    200,
  )
}
