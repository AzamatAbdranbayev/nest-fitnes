import {
    Body,
    Controller,
    Param,
    Post,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
    Request,
    Put,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CheckCodeUserDto, LoginUserDto } from './dto/user.dto'
import { UserService } from './user.service'

@ApiTags('Пользователь')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @ApiOperation({
        summary:
            'Первый способ: Отправка номера телефона для получения смс кода',
    })
    @ApiResponse({ status: 200, type: LoginUserDto })
    @Post('/')
    login(@Body() loginDto: LoginUserDto) {
        return this.userService.loginUser(loginDto)
    }

    @ApiOperation({
        summary: 'Проверка кода',
    })
    @ApiResponse({ status: 200, type: LoginUserDto })
    @Put('/')
    checkCode(@Body() checkCodeUserDto: CheckCodeUserDto) {
        return this.userService.checkCode(checkCodeUserDto)
    }
}
