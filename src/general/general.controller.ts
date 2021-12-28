import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { GeneralService } from './general.service'

@ApiTags('Общие методы')
@Controller('general')
export class GeneralController {
    constructor(private generalService: GeneralService) {}

    @ApiOperation({ summary: 'Получение списка всех фитнес клубов' })
    // @ApiResponse({ status: 200, type: UpdateCompanyDto })
    // @UseGuards(JwtAuthGuard)
    @Get('/fitness/list')
    getAllFitness() {
        return this.generalService.getAllFintess()
    }
}
