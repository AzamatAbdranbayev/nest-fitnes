import { Module } from '@nestjs/common'
import { SuperAdminController } from './super-admin.controller'
import { SuperAdmin } from './super-admin.model'
import { SuperAdminService } from './super-admin.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'

@Module({
    controllers: [SuperAdminController],
    providers: [SuperAdminService],
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        SequelizeModule.forFeature([SuperAdmin]),
        JwtModule.register({
            privateKey: process.env.JWT_KEY,
            signOptions: {
                expiresIn: '5h',
            },
        }),
    ],
    exports: [SuperAdminService, JwtModule],
})
export class SuperAdminModule {}
