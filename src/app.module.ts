import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AdminModule } from './admin/admin.module'
import { SequelizeModule } from '@nestjs/sequelize'
import { Admin } from './admin/admin.model'
import { CompanyModule } from './company/company.module'
import { Company } from './company/company.model'
import { FilesModule } from './files/files.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ApplicationsModule } from './applications/applications.module'
import * as path from 'path'
import { Application } from './applications/applications.model'
import { SuperAdminModule } from './super-admin/super-admin.module'
import { SuperAdmin } from './super-admin/super-admin.model'
import { UserModule } from './user/user.module'
import { User } from './user/user.model'
import { VerificationPhone } from './user/verificationPhone.model'
import { GeneralModule } from './general/general.module'
import { ServiceCategoryModule } from './service-category/service-category.module'
import { ServiceCategoryModel } from './service-category/service-category.model'

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            models: [
                Admin,
                Company,
                Application,
                SuperAdmin,
                User,
                VerificationPhone,
                ServiceCategoryModel,
            ],
            autoLoadModels: true,
        }),
        AdminModule,
        CompanyModule,
        FilesModule,
        ApplicationsModule,
        SuperAdminModule,
        UserModule,
        GeneralModule,
        ServiceCategoryModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
