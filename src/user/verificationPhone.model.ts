import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

interface VerificationPhoneAttrs {
    id?: number
    code: string
    phone: string
}

@Table({ tableName: 'verificationPhone' })
export class VerificationPhone extends Model<
    VerificationPhone,
    VerificationPhoneAttrs
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
        example: '4636',
        description: '4-x значный код смс верификации',
    })
    @Column({ type: DataType.STRING, allowNull: false })
    code: string

    @ApiProperty({
        example: '+77755577041',
        description: 'Номер сотового телефона',
    })
    @Column({ type: DataType.STRING, allowNull: false })
    phone: string
}
