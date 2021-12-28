import { forwardRef, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { SequelizeModule } from '@nestjs/sequelize'
import { Company } from 'src/company/company.model'
import { CompanyModule } from 'src/company/company.module'
import { AdminController } from './admin.controller'
import { Admin } from './admin.model'
import { AdminService } from './admin.service'
console.log('admin module', process.env.JWT_KEY)

@Module({
    controllers: [AdminController],
    providers: [AdminService],
    imports: [
        // ConfigModule.forRoot({
        //     isGlobal: true,
        //     envFilePath: `.${process.env.NODE_ENV}.env`,
        // }),
        SequelizeModule.forFeature([Admin, Company]),
        JwtModule.register({
            privateKey: process.env.JWT_KEY,
            signOptions: {
                expiresIn: '24h',
            },
        }),
        forwardRef(() => CompanyModule),
    ],
    exports: [AdminService, JwtModule],
})
export class AdminModule {}
