import { HttpService } from '@nestjs/axios'
import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import axios, { AxiosResponse } from 'axios'
import { Observable } from 'rxjs'
import { CheckCodeUserDto, LoginUserDto } from './dto/user.dto'
import { User } from './user.model'
import { VerificationPhone } from './verificationPhone.model'
import { map } from 'rxjs/operators'
import { response } from 'express'

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        @InjectModel(VerificationPhone)
        private verificationPhoneRepository: typeof VerificationPhone,
        private httpService: HttpService,
    ) {}

    async findUserByPhone(dto: LoginUserDto) {
        const user = await this.userRepository.findOne({
            where: { phone: dto.phone },
        })
        return user
    }

    async createUser() {}

    async updateUser() {}

    async loginUser(dto: LoginUserDto) {
        const user = await this.findUserByPhone(dto)
        if (!user) {
            await this.generateRandomNumber(dto.phone)
            throw new HttpException(
                'Пользователь не зарегестрирован',
                HttpStatus.BAD_REQUEST,
            )
        } else {
            await this.generateRandomNumber(dto.phone)
        }
        console.log('user find : ', user)
    }

    async pay() {}

    async generateRandomNumber(phone: string) {
        let max = 99999
        let min = 10000
        let randomNumber = (
            Math.floor(Math.random() * (max - min)) + min
        ).toString()
        let message = `${randomNumber} код подтверждения в приложении QFit`
        console.log('SMSC_URL', process.env.SMSC_URL)
        console.log(randomNumber)
        await this.createVerificationPhone(phone, randomNumber)
        const check = this.sendSmsCode(phone, message)
        console.log('check : ', check)
        return
    }

    // sendSmsCode(
    //     phone: string,
    //     message: string,
    // ): Observable<AxiosResponse<any>> {
    //     return this.httpService
    //         .get(
    //             `${process.env.SMSC_URL}?login=${process.env.SMSC_LOGIN}&psw=${process.env.SMSC_PASSWORD}&phones=${phone}&mes=${message}`,
    //         )
    //         .pipe(
    //             map((axiosResponse: AxiosResponse) => {
    //                 return axiosResponse.data
    //             }),
    //         )
    // }

    async sendSmsCode(phone: string, message: string) {
        console.log(
            `${process.env.SMSC_URL}?login=${process.env.SMSC_LOGIN}&psw=${process.env.SMSC_PASSWORD}&phones=${phone}&mes='${message}'`,
        )
        const response = await axios.get(
            encodeURI(
                `${process.env.SMSC_URL}?login=${process.env.SMSC_LOGIN}&psw=${process.env.SMSC_PASSWORD}&phones=${phone}&mes=${message}&sender=QFit.kz`,
            ),
        )
        console.log(response)
        return response.data
    }

    async createVerificationPhone(phone: string, code: string) {
        const row = await this.verificationPhoneRepository.create({
            phone,
            code,
        })
        console.log(row)
        return row
    }

    async checkCode(checkCodeUserDto: CheckCodeUserDto) {
        const codehas = await this.verificationPhoneRepository.findOne({
            where: {
                code: checkCodeUserDto.code,
                phone: checkCodeUserDto.phone,
            },
        })
        if (!codehas) {
            throw new HttpException('Код не совпадает', HttpStatus.BAD_REQUEST)
        } else {
            return 'ok'
        }
    }
}
