import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

interface ServiceCategoryAttrs {
    id?: number
    name: string
    image: string
}

@Table({ tableName: 'category' })
export class ServiceCategoryModel extends Model<
    ServiceCategoryModel,
    ServiceCategoryAttrs
> {
    @ApiProperty({ example: '1', description: 'Уникальный индентификатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @ApiProperty({
        example: 'боевые искусства',
        description: 'наименование боевых искусств фитнес центра',
    })
    @Column({ type: DataType.CHAR, allowNull: false })
    name: string

    @ApiProperty({
        example: '1#4hf.png',
        description: 'изображения боевых искусств фитнес центра',
    })
    @Column({ type: DataType.CHAR, allowNull: false })
    image: string
}
