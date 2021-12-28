import { Controller, Post, Body } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { LoginSuperAdminDto } from './dto/login.dto'
import { SuperAdmin } from './super-admin.model'
import { SuperAdminService } from './super-admin.service'

@ApiTags('Супер-Админ')
@Controller('super_admin')
export class SuperAdminController {
    constructor(private superAdminService: SuperAdminService) {}

    @ApiOperation({ summary: 'Авторизация' })
    @ApiResponse({ status: 200, type: SuperAdmin })
    @Post('/auth/login')
    create(@Body() superAdminDto: LoginSuperAdminDto) {
        return this.superAdminService.login(superAdminDto)
    }

    // @Post("/")
    // test(){
    //     return this.superAdminService.test()
    // }
}
