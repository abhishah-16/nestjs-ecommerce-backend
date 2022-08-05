import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SellerGuard } from 'src/guards/seller.guard';
import { User as userDoc } from 'src/types/user';
import { User } from 'src/utilities/user.decorator';
import { CreateProductDto, UpdateProductdto } from './product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productservice: ProductService) {
    }

    @Get()
    async listAll() {
        return this.productservice.findAll()
    }

    @Post()
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async create(@Body() Product: CreateProductDto, @User() user: userDoc) {
        return this.productservice.create(Product, user)
    }

    @Get(':id')
    async findByid(@Param('id') id: string) {
        return this.productservice.findOne(id)
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async update(
        @Param('id') id: string,
        @Body() product: UpdateProductdto,
        @User() user: userDoc) {
        const { id: userid } = user
        return this.productservice.update(id, product, userid)
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async delete(
        @Param('id') id: string,
        @User() user: userDoc) {
        const { id: userid } = user
        return this.productservice.delete(id, userid)
    }
}
