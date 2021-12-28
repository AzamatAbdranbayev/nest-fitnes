import { Injectable } from '@nestjs/common'
import { ServiceCategoryModel } from './service-category.model'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class ServiceCategoryService {
    constructor(
        @InjectModel(ServiceCategoryModel)
        private serviceCategoryRepository: typeof ServiceCategoryModel,
    ) {}

    async getAllServiceCategories() {
        const categories = await this.serviceCategoryRepository.findAll({
            raw: true,
        })
        return categories
    }
}
