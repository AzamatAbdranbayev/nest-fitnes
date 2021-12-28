import { ApiProperty } from '@nestjs/swagger'

export class UpdateCompanyDto {
    @ApiProperty({
        example:
            'Фитнес клуб с очень удобным расположением и самой выгодной ценой. ',
        description: 'Описание фитнес центра',
    })
    readonly description?: string

    @ApiProperty({
        example: '[324dgfg24.fintes1.png,grehg34sd.fintes1.png]',
        description: 'Изображения фитнес центра',
    })
    readonly images?: string

    @ApiProperty({ example: 'Дни', description: 'Дни фитнес центра' })
    readonly days?: string

    @ApiProperty({
        example: '+7 701 101 60 30',
        description: 'Контактные данные фитнес центра',
    })
    readonly contacts?: string
}

export class DeleteCompanyImagesDto {}
