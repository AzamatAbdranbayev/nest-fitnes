import { Injectable } from '@nestjs/common'
import { CompanyService } from 'src/company/company.service'

@Injectable()
export class GeneralService {
    constructor(private companyService: CompanyService) {}

    async getAllFintess() {
        return this.companyService.getCompanyAll()
    }
}
