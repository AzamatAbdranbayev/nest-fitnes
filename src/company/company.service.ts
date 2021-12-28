import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { AdminService } from 'src/admin/admin.service'
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto'
import { FilesService } from 'src/files/files.service'
import { Company } from './company.model'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'

@Injectable()
export class CompanyService {
    constructor(
        @InjectModel(Company) private companyRepository: typeof Company,
        private adminService: AdminService,
        private filesService: FilesService,
    ) {}

    async createCompanyByApplication(dto: CreateCompanyDto) {
        const company = await this.companyRepository.create({ ...dto })
        const adminDto: CreateAdminDto = {
            idCompany: company.id,
            email: company.adminEmails,
            password: '',
        }
        await this.adminService.createAdmin({ ...adminDto })
        return company
    }

    async createCompany(dto: CreateCompanyDto, images: any, avatar: any) {
        const filesName = await this.filesService.createFile(images)
        const avatarName = await this.filesService.createFile(avatar)
        if (filesName.length > 0) {
            const company = await this.companyRepository.create({
                ...dto,
                images: JSON.stringify([...filesName]),
                avatar: JSON.stringify(avatarName),
            })

            const adminDto: CreateAdminDto = {
                idCompany: company.id,
                email: company.adminEmails,
                password: '',
            }
            await this.adminService.createAdmin({ ...adminDto })

            return company
        } else {
            throw new HttpException(
                'Изображения отсутствуют',
                HttpStatus.BAD_REQUEST,
            )
        }
    }

    async updateCompany(
        dto: UpdateCompanyDto,
        idCompany: number,
        images: any,
        avatar: any,
    ) {
        if (images || avatar) {
            let filesName = []
            let avatarName = []

            if (images) {
                filesName = [...(await this.filesService.createFile(images))]
            }
            if (avatar) {
                avatarName = [...(await this.filesService.createFile(avatar))]
            }

            const company = await this.companyRepository.findOne({
                where: { id: idCompany },
            })
            company instanceof Company

            const companyUpdated = await this.companyRepository.update(
                {
                    ...dto,
                    images: JSON.stringify(
                        JSON.parse(company.images).concat(filesName),
                    ),
                    avatar: JSON.stringify(avatarName),
                },
                { where: { id: idCompany } },
            )
            return companyUpdated
        } else {
            const companyUpdated = await this.companyRepository.update(
                { ...dto },
                { where: { id: idCompany } },
            )
            return companyUpdated
        }
    }

    async deleteImagesCompany(fileName: string, email: string) {
        try {
            const company = await this.getCompanyByEmailAdmin(email)
            if (company && JSON.parse(company.images).includes(fileName)) {
                const deletedImage = await this.filesService.deleteFile(
                    fileName,
                )
                await this.companyRepository.update(
                    {
                        images: JSON.stringify(
                            JSON.parse(company.images).filter(
                                (i) => i !== fileName,
                            ),
                        ),
                    },
                    {
                        where: {
                            id: company.id,
                        },
                    },
                )
            } else {
                throw new HttpException(
                    'Нет доступа к удалению файла',
                    HttpStatus.BAD_REQUEST,
                )
            }
            return { message: 'success' }
        } catch (e) {
            throw new HttpException(
                'Нет доступа к удалению файла',
                HttpStatus.BAD_REQUEST,
            )
        }
    }

    async getCompanyByEmailAdmin(email: string) {
        const company = await this.companyRepository.findOne({
            where: { adminEmails: email },
            include: { all: true },
        })
        return company
    }

    async getCompanyAll() {
        const companies = await this.companyRepository.findAll({
            raw: true,
            attributes: { exclude: ['adminEmails'] },
        })
        return companies
    }
}
