import { ApiProperty } from '@nestjs/swagger'
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { BelongsTo } from 'sequelize/types'
import { Admin } from 'src/admin/admin.model'

interface CompanyAttrs {
    id: number
    name: string
    raiting?: string
    address: string
    qr_url?: string
    latitude: string
    longtitude: string
    description: string
    avatar?: string
    images?: string
    tags?: string
    days?: string
    contacts: string
    adminEmails: string
    city: string
}
@Table({ tableName: 'company' })
export class Company extends Model<Company, CompanyAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный индентификатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @ApiProperty({
        example: 'Urban Gym',
        description: 'Наименование фитнес центра',
    })
    @Column({ type: DataType.STRING, allowNull: false })
    name: string

    @ApiProperty({ example: '5,0', description: 'Рэйтинг фитнес-центра' })
    @Column({ type: DataType.STRING })
    raiting: string

    @ApiProperty({
        example: 'Almaty,ул.Курмангазы',
        description: 'Адресс фитнес центра',
    })
    @Column({ type: DataType.STRING, allowNull: false })
    address: string

    @ApiProperty({
        example: 'http://qrfit/qr_ulr/123vgfre23df',
        description: 'Адрес QR-кода фитнес центра',
    })
    @Column({ type: DataType.STRING })
    qr_url: string

    @ApiProperty({ example: '76°55′42″', description: 'Ширина фитнес-центра' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    latitude: string

    @ApiProperty({ example: '43°15′24″', description: 'Долгота фитнес-центра' })
    @Column({ type: DataType.STRING, allowNull: false })
    longtitude: string

    @ApiProperty({
        example: 'Модный фитнес центра для Вас',
        description: 'Описание фитнес центра',
    })
    @Column({ type: DataType.STRING, allowNull: false })
    description: string

    @ApiProperty({
        example: '324dgfg24.avatar.png',
        description: 'главное изображение(Аватар) фитнес центра',
    })
    @Column({ type: DataType.STRING })
    avatar: string

    @ApiProperty({
        example: '[324dgfg24.fintes1.png,grehg34sd.fintes1.png]',
        description: 'Изображения фитнес центра',
    })
    @Column({ type: DataType.STRING })
    images: string

    @ApiProperty({ example: 'TAGS', description: 'Тэги фитнес центра' })
    @Column({ type: DataType.STRING })
    tags: string

    @ApiProperty({ example: 'ДНИ', description: 'Дни фитнес центра' })
    @Column({ type: DataType.STRING })
    days: string

    @ApiProperty({
        example: '8-72-75-748-875-4',
        description: 'Контакты фитнес центра',
    })
    @Column({ type: DataType.STRING, allowNull: false })
    contacts: string

    @ApiProperty({
        example: 'admin1@gmail.com',
        description: 'Администраторы фитнес центра',
    })
    @Column({ type: DataType.STRING, allowNull: false })
    adminEmails: string

    @ApiProperty({
        example: 'Алматы',
        description: 'Город фитнес центра',
    })
    @Column({ type: DataType.STRING })
    city: string

    @HasMany(() => Admin)
    admin: Admin[]
}
