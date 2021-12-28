import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

interface SuperAdminAttrs {
    id?: number
    email: string
    password: string
}

@Table({ tableName: 'super-admin' })
export class SuperAdmin extends Model<SuperAdmin, SuperAdminAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный индентификатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @ApiProperty({ example: '1', description: 'Уникальный индентификатор' })
    @Column({ type: DataType.CHAR, unique: true, allowNull: false })
    email: string

    @ApiProperty({ example: 'false', description: 'Статус принятия заявки' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string
}
