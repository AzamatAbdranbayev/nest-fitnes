import { Module, forwardRef } from '@nestjs/common'
import { ApplicationsController } from './applications.controller'
import { ApplicationsService } from './applications.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { Application } from './applications.model'
import { CompanyModule } from 'src/company/company.module'
import { SuperAdminModule } from 'src/super-admin/super-admin.module'
@Module({
    controllers: [ApplicationsController],
    providers: [ApplicationsService],
    imports: [
        SequelizeModule.forFeature([Application]),
        forwardRef(() => CompanyModule),
        forwardRef(() => SuperAdminModule),
    ],
})
export class ApplicationsModule {}
