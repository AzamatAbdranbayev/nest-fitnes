import { Module } from '@nestjs/common'
import { ServiceCategoryController } from './service-category.controller'
import { ServiceCategoryModel } from './service-category.model'
import { ServiceCategoryService } from './service-category.service'
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
    controllers: [ServiceCategoryController],
    providers: [ServiceCategoryService],
    imports: [SequelizeModule.forFeature([ServiceCategoryModel])],
})
export class ServiceCategoryModule {}
