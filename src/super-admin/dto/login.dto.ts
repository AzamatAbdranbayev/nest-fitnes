import { ApiProperty } from '@nestjs/swagger'

export class LoginSuperAdminDto {
    @ApiProperty({ example: '123@gmail.com', description: 'Почта' })
    readonly email: string

    @ApiProperty({ example: '123gf4', description: 'Пароль' })
    readonly password: boolean
}
