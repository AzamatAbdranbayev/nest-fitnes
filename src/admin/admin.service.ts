import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import encryption from 'src/helpers/encryption'
import { Admin } from './admin.model'
import { CreateAdminDto } from './dto/create-admin.dto'
import { nanoid } from 'nanoid'
import * as nodemailer from 'nodemailer'
import { LoginAdminDto } from './dto/login-admin.dto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(Admin)
        private adminRepository: typeof Admin,
        private jwtService: JwtService,
    ) {}

    async createAdmin(dto: CreateAdminDto) {
        const generatePass = nanoid(10)
        const password = await encryption.encrypt(generatePass)
        const admin = await this.adminRepository.create({ ...dto, password })
        this.sendEmail(generatePass, admin.email)
        return admin
    }

    async sendEmail(password: string, emailTo: string) {
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_EMAIL_PASS,
            },
        })
        let mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: emailTo,
            subject: 'Авторизация ',
            html: `<span>Ваш код авторизации <strong>${password} </strong><br>Пожалуйста не сообщайте никому код</span>`,
        }
        const send = await transporter.sendMail(mailOptions)
        console.log('send : ', send)
        return send
    }

    async login(dto: LoginAdminDto) {
        const foundAdmin = await this.getAdminByEmail(dto.email)

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

        console.log('_________________', process.env.JWT_KEY)
        const encryptData = { email: foundAdmin.email, id: foundAdmin.id }
        const token = this.jwtService.sign(encryptData, {
            secret: process.env.JWT_KEY,
        })
        console.log('token token : ', token)
        return { token }
    }

    async getAdminByEmail(email: string) {
        const admin = await this.adminRepository.findOne({
            where: { email },
            include: { all: true },
        })
        return admin
    }
}
