import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './user.model'
import { VerificationPhone } from './verificationPhone.model'
import { HttpModule } from '@nestjs/axios'

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        HttpModule,
        SequelizeModule.forFeature([User, VerificationPhone]),
    ],
})
export class UserModule {}
