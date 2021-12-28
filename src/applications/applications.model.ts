import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

interface ApplicationAttrs {
    id?: number
    status: boolean
    body: string
}

@Table({ tableName: 'applications' })
export class Application extends Model<Application, ApplicationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный индентификатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @ApiProperty({ example: 'false', description: 'Статус принятия заявки' })
    @Column({ type: DataType.BOOLEAN, allowNull: false })
    status: boolean

    @ApiProperty({
        example: "{name:'фитнес Gym',description:'...',latitude:'...'}",
        description: 'Статус принятия заявки',
    })
    @Column({ type: DataType.CHAR(1000), unique: true, allowNull: false })
    body: string
}
