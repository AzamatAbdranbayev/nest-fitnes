import {
    Body,
    Controller,
    Param,
    Post,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
    Request,
    Get,
} from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/admin/jwt-auth.guard'
import { Company } from './company.model'
import { CompanyService } from './company.service'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'

@ApiTags('Компания')
@Controller('admin_panel/company')
export class CompanyController {
    constructor(private copmanyService: CompanyService) {}

    @ApiOperation({
        summary: 'Добавление/Изменение информации о фитнес-центре',
    })
    @ApiResponse({ status: 200, type: UpdateCompanyDto })
    @UseGuards(JwtAuthGuard)
    @Post('/:idCompany')
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'images', maxCount: 7 },
            { name: 'avatar', maxCount: 1 },
        ]),
    )
    update(
        @Body() copmanyDto: UpdateCompanyDto,
        @Param('idCompany') idCompany: string,
        @UploadedFiles() files: { images?: any; avatar?: any },
    ) {
        return this.copmanyService.updateCompany(
            copmanyDto,
            parseInt(idCompany),
            files.images,
            files.avatar,
        )
    }

    @ApiOperation({ summary: 'Удаление изображения о фитнес-центре' })
    @ApiResponse({ status: 200, type: UpdateCompanyDto })
    @UseGuards(JwtAuthGuard)
    @Post('/files/images/:fileName')
    delete(@Param('fileName') fileName: string, @Request() req) {
        console.log('request ', req.user)
        return this.copmanyService.deleteImagesCompany(
            fileName,
            req.user?.email,
        )
    }
}
