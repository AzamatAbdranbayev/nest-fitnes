import { Module } from '@nestjs/common'
import { CompanyModule } from 'src/company/company.module'
import { GeneralController } from './general.controller'
import { GeneralService } from './general.service'

@Module({
    controllers: [GeneralController],
    providers: [GeneralService],
    imports: [CompanyModule],
})
export class GeneralModule {}
