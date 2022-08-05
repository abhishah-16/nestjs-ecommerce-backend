import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/types/product';
import { User } from 'src/types/user';
import { CreateProductDto, UpdateProductdto } from './product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private productModel: Model<Product>) { }

    async findAll() {
        return await this.productModel.find().select(' -password -createdAt').populate('owner', ' -password -createdAt')
    }

    async findOne(id: string) {
        return await this.productModel.findById(id).select('-password -createdAt').populate('owner', ' -password -createdAt')
    }

    async create(data: CreateProductDto, user: User) {
        const product = await this.productModel.create({
            ...data,
            owner: user
        })
        await product.save()
        return product
    }

    async update(id: string, data: UpdateProductdto, userid: string) {
        const product = await this.productModel.findById(id)
        if (!product) {
            throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND)
        } else if (userid != product.owner.toString()) {
            throw new HttpException('You do not own this product', HttpStatus.UNAUTHORIZED)
        } else {
            await product.update(data)
            return product
        }
    }

    async delete(id: string, userid: string) {
        const product = await this.productModel.findById(id)
        if (!product) {
            throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND)
        } else if (userid != product.owner.toString()) {
            throw new HttpException('You do not own this product', HttpStatus.UNAUTHORIZED)
        } else {
            await product.remove()
            return ('Product is deleted')
        }
    }
}
