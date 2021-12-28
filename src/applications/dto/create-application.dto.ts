import { ApiProperty } from '@nestjs/swagger'

export class CreateApplicationDto {
    @ApiProperty({ example: '1', description: 'Уникальный индентификатор' })
    readonly id: number

    @ApiProperty({ example: 'false', description: 'Статус принятия заявки' })
    readonly status: boolean

    @ApiProperty({
        example: "{name:'фитнес Gym',description:'...',latitude:'...'}",
        description: 'Статус принятия заявки',
    })
    readonly body: string
}
