import { Module, forwardRef } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Admin } from 'src/admin/admin.model'
import { AdminModule } from 'src/admin/admin.module'
import { AdminService } from 'src/admin/admin.service'
import { JwtAuthGuard } from 'src/admin/jwt-auth.guard'
import { FilesModule } from 'src/files/files.module'
import { CompanyController } from './company.controller'
import { Company } from './company.model'
import { CompanyService } from './company.service'

@Module({
    controllers: [CompanyController],
    providers: [CompanyService],
    imports: [
        SequelizeModule.forFeature([Company, Admin]),
        forwardRef(() => AdminModule),
        FilesModule,
    ],
    exports: [CompanyService],
})
export class CompanyModule {}
