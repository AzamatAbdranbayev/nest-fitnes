import { ApiProperty } from '@nestjs/swagger'

export class CreateCompanyDto {
    readonly id: number

    @ApiProperty({
        example: 'Urban Gym',
        description: 'Наименование фитнес центра',
    })
    readonly name: string

    @ApiProperty({ example: '5,0', description: 'Рэйтинг фитнес-центра' })
    readonly raiting?: string

    @ApiProperty({
        example: 'Almaty,ул.Курмангазы',
        description: 'Адресс фитнес центра',
    })
    readonly address: string

    @ApiProperty({
        example: 'http://qrfit/qr_ulr/123vgfre23df',
        description: 'Адрес QR-кода фитнес центра',
    })
    readonly qr_url?: string

    @ApiProperty({ example: '76°55′42″', description: 'Ширина фитнес-центра' })
    readonly latitude: string

    @ApiProperty({ example: '43°15′24″', description: 'Долгота фитнес-центра' })
    readonly longtitude: string

    @ApiProperty({
        example: 'Модный фитнес центра для Вас',
        description: 'Описание фитнес центра',
    })
    readonly description: string

    @ApiProperty({
        example: '324dgfg24.avatar.png',
        description: 'главное изображение(Аватар) фитнес центра',
    })
    readonly avatar?: string

    @ApiProperty({
        example: '[324dgfg24.fintes1.png,grehg34sd.fintes1.png]',
        description: 'Изображения фитнес центра',
    })
    readonly images?: string

    @ApiProperty({ example: 'TAGS', description: 'Тэги фитнес центра' })
    readonly tags?: string

    @ApiProperty({ example: 'ДНИ', description: 'Дни фитнес центра' })
    readonly days?: string

    @ApiProperty({
        example: '8-72-75-748-875-4',
        description: 'Контакты фитнес центра',
    })
    readonly contacts: string

    @ApiProperty({
        example: 'admin1@gmail.com',
        description: 'Администраторы фитнес центра',
    })
    readonly adminEmails: string

    @ApiProperty({
        example: 'Алматы',
        description: 'Город фитнес центра',
    })
    readonly city: string
}
