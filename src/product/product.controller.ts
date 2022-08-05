import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productservice: ProductService) {
    }

    @Get()
    listAll() { }

    @Post()
    create() { }

    @Get(':id')
    findByid() { }

    @Put(':id')
    update() {

    }

    @Delete(':id')
    delete() { }
}
