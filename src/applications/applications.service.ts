import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { throws } from 'assert'
import { application, raw } from 'express'
import { CompanyService } from 'src/company/company.service'
import { Application } from './applications.model'
import { CreateApplicationDto } from './dto/create-application.dto'

@Injectable()
export class ApplicationsService {
    constructor(
        @InjectModel(Application)
        private applicationRepository: typeof Application,
        private companyService: CompanyService,
    ) {}

    async createApplication(dto: CreateApplicationDto) {
        const application = await this.applicationRepository.create({
            ...dto,
            status: false,
            body: JSON.stringify(dto.body),
        })
        return application
    }

    async deleteApplication(id: string) {
        const application = await this.applicationRepository.destroy({
            where: { id },
        })
        return application
    }

    async acceptApplication(id: string) {
        const application = await this.applicationRepository.update(
            { status: true },
            { where: { id }, returning: true },
        )
        console.log('application : ', application)
        const companyData = application[1][0].get().body

        const createCompany =
            await this.companyService.createCompanyByApplication(
                JSON.parse(companyData),
            )
        console.log('createCompany : ', createCompany)
        return createCompany
    }

    async getAllApplications() {
        let applications: any = await this.applicationRepository.findAll({
            raw: true,
        })
        applications = applications.map((apl) => {
            return { ...apl, body: JSON.parse(apl.body) }
        })
        return applications
    }
}
