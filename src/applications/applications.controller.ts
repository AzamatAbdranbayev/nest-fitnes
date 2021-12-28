import { Body, Controller, Post, Param, UseGuards, Get } from '@nestjs/common'
import { Application } from './applications.model'
import { ApplicationsService } from './applications.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateApplicationDto } from './dto/create-application.dto'
import { JwtAuthSuperAdminGuard } from 'src/super-admin/jwt-auth.superAdmin.guard'

@ApiTags('Заявки')
@Controller('applications')
export class ApplicationsController {
    constructor(private applicationService: ApplicationsService) {}

    @ApiOperation({ summary: 'Список всех заявок' })
    @ApiResponse({ status: 200, type: Application })
    @UseGuards(JwtAuthSuperAdminGuard)
    @Get('/list')
    getAll() {
        return this.applicationService.getAllApplications()
    }

    @ApiOperation({ summary: 'Создание заявки на создание компании' })
    @ApiResponse({ status: 200, type: Application })
    @Post('/new')
    create(@Body() applicationDto: CreateApplicationDto) {
        return this.applicationService.createApplication(applicationDto)
    }

    @ApiOperation({
        summary:
            'Подтверждение заявки и автоматическое создание компании и отправка геренированного пароля на почту администартора',
    })
    @ApiResponse({ status: 200, type: Application })
    @UseGuards(JwtAuthSuperAdminGuard)
    @Post('/accept/:appId')
    accept(@Param('appId') appId: string) {
        return this.applicationService.acceptApplication(appId)
    }

    @ApiOperation({
        summary: 'Отмена заявки, удаление с таблицы  Applications',
    })
    @ApiResponse({ status: 200, type: Application })
    @UseGuards(JwtAuthSuperAdminGuard)
    @Post('/delete/:appId')
    delete(@Param('appId') appId: string) {
        return this.applicationService.deleteApplication(appId)
    }
}
