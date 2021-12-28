import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AdminService } from './admin.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
    LoginAdminDto,
    LoginSuccessDto,
    LoginFailDto,
} from './dto/login-admin.dto'
import { JwtAuthGuard } from './jwt-auth.guard'

@ApiTags('Администраторы')
@Controller('admin_panel/admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @ApiOperation({ summary: 'Авторизация администратора' })
    @ApiResponse({ status: 200, type: LoginSuccessDto })
    @ApiResponse({ status: 400, type: LoginFailDto })
    @Post('/login')
    login(@Body() adminDto: LoginAdminDto) {
        console.log(adminDto)
        return this.adminService.login(adminDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/test')
    test() {
        return { message: 'ok' }
    }
}
