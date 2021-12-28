import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

interface UserAttrs {
    id?: number
    email: string
    phone: string
    name: string
    second_name: string
    bonuses: number
    avatar: string
    telegram_id: number
    month_bonuses: number
    points: number
    ref_code: string
    last_numbers: string
    card_token: string
    card_type: string
}

@Table({ tableName: 'user' })
export class User extends Model<User, UserAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный индентификатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @ApiProperty({
        example: 'aabdranbayev@gmail.com',
        description: 'Почта пользователя',
    })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string

    @ApiProperty({
        example: '+77755577041',
        description: 'Номер сотового телефона',
    })
    @Column({ type: DataType.STRING, allowNull: false })
    phone: string

    @ApiProperty({
        example: 'Азамат',
        description: 'Имя пользователя',
    })
    @Column({ type: DataType.STRING, allowNull: false })
    name: string

    @ApiProperty({
        example: 'Абдранбаев',
        description: 'Фамилия пользователя',
    })
    @Column({ type: DataType.STRING, allowNull: false })
    second_name: string

    @ApiProperty({
        example: '145',
        description: 'Бонусы пользователя',
    })
    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    bonuses: number

    @ApiProperty({
        example: '35gfdh!243.png',
        description: 'наименование файла-изображения',
    })
    @Column({ type: DataType.CHAR, allowNull: false })
    avatar: string

    @ApiProperty({
        example: '0',
        description: 'айди телеграмма пользователя',
    })
    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    telegram_id: number

    @ApiProperty({
        example: '0',
        description: 'хз че это month_bonuses',
    })
    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    month_bonuses: number

    @ApiProperty({
        example: '0',
        description: 'хз че это points',
    })
    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    points: number

    @ApiProperty({
        example: '0',
        description: 'хз че это ref_code',
    })
    @Column({ type: DataType.CHAR, allowNull: true, defaultValue: '' })
    ref_code: string

    @ApiProperty({
        example: '0',
        description: 'хз че это last_numbers',
    })
    @Column({ type: DataType.CHAR, allowNull: true, defaultValue: '' })
    last_numbers: string

    @ApiProperty({
        example: '0',
        description: 'хз че это card_token',
    })
    @Column({ type: DataType.CHAR, allowNull: true, defaultValue: '' })
    card_token: string

    @ApiProperty({
        example: '0',
        description: 'хз че это card_type',
    })
    @Column({ type: DataType.CHAR, allowNull: true, defaultValue: '' })
    card_type: string
}
