import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
    BelongsTo,
} from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { Company } from 'src/company/company.model'

interface AdminAttrs {
    id?: number
    email: string
    password: string
    idCompany: number
}
@Table({ tableName: 'admins' })
export class Admin extends Model<Admin, AdminAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный индентификатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @ApiProperty({
        example: 'admin@gmail.com',
        description: 'Почта администратора фитнес центра',
    })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string

    @ApiProperty({
        example: '@#32rfv3$36gz*&',
        description: 'Шифрованный пароль фитнес центра',
    })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string

    @ApiProperty({
        example: '4',
        description: 'Уникальный индентификатор фитнес центра',
    })
    @ForeignKey(() => Company)
    @Column({ type: DataType.INTEGER, allowNull: false })
    idCompany: number

    @BelongsTo(() => Company)
    company: Company
}
