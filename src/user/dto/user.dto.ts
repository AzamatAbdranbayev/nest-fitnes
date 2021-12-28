import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
    @ApiProperty({ example: '123@gmail.com', description: 'Почта' })
    readonly email: string

    @ApiProperty({
        example: '+77755577041',
        description: 'Номер сотового телефона',
    })
    readonly phone: string
}

export class LoginUserDto {
    @ApiProperty({
        example: '+77755577041',
        description: 'Номер сотового телефона',
    })
    readonly phone: string
}

export class CheckCodeUserDto {
    @ApiProperty({
        example: '+77755577041',
        description: 'Номер сотового телефона',
    })
    readonly phone: string

    @ApiProperty({
        example: '14965',
        description: 'Код, который пришел на телефон (смс)',
    })
    readonly code: string
}
