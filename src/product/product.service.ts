import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/types/product';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private productModel: Model<Product>) { }

    async findAll() {
        return await this.productModel.find().populate('owner')
    }

    async findOne(id: string) {
        return await this.productModel.findById(id).populate('owner')
    }

    async create() {
        
    }
}
