import { ApiProperty } from '@nestjs/swagger'

export class CreateAdminDto {
    @ApiProperty({
        example: 'admin@gmail.com',
        description: 'Почта администратора фитнес центра',
    })
    readonly email: string

    @ApiProperty({
        example: '@#32rfv3$36gz*&',
        description: 'Шифрованный пароль фитнес центра',
    })
    readonly password: string

    readonly id?: number

    @ApiProperty({
        example: '4',
        description: 'Уникальный индентификатор фитнес центра',
    })
    readonly idCompany: number
}
