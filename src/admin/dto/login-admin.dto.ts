import { ApiProperty } from '@nestjs/swagger'

export class LoginAdminDto {
    @ApiProperty({
        example: 'admin@gmail.com',
        description: 'Почта администратора фитнес центра',
    })
    readonly email: string

    @ApiProperty({ example: 'pass123', description: 'Пароль фитнес центра' })
    readonly password: string
}

export class LoginSuccessDto {
    @ApiProperty({
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhYmRyYW5iYXlldkBnbWFpbC5jb20iLCJpZCI6OSwiaWF0IjoxNjM2ODk3ODA4LCJleHAiOjE2MzY5ODQyMDh9.w8aVOrxQpSKBtKGwYKNyibr-9pPSBDFTyXj0_06z3w8',
        description: 'Токен авторизации',
    })
    readonly token: string
}

export class LoginFailDto {
    @ApiProperty({
        example: 400,
        description: 'Статус кода ошибки',
    })
    readonly statusCode: string

    @ApiProperty({
        example: 'Не верный логин',
        description: 'Сообщение ошибки',
    })
    readonly message: string
}
