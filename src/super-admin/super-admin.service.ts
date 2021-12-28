import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import encryption from 'src/helpers/encryption'
import { LoginSuperAdminDto } from './dto/login.dto'
import { SuperAdmin } from './super-admin.model'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class SuperAdminService {
    constructor(
        @InjectModel(SuperAdmin)
        private superAdminRepository: typeof SuperAdmin,
        private jwtService: JwtService,
    ) {}

    async login(dto: LoginSuperAdminDto) {
        const foundAdmin = await this.superAdminRepository.findOne({
            where: { email: dto.email },
        })

        if (!foundAdmin) {
            throw new HttpException('Не верный логин', HttpStatus.BAD_REQUEST)
        }
        const decryptPass = await encryption.decrypt(
            dto.password,
            foundAdmin.password,
        )
        if (!decryptPass) {
            throw new HttpException('Не верный пароль', HttpStatus.BAD_REQUEST)
        }

        const encryptData = { email: foundAdmin.email, id: foundAdmin.id }
        const token = this.jwtService.sign(encryptData)
        return { token }
    }

    // async test() {
    //     const pass = await encryption.encrypt("mainqfit123dev")
    //     await  this.superAdminRepository.create({email:"qrfit.info@gmail.com",password:pass})
    // }
}
