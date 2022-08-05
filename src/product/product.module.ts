import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ProductSchema } from 'src/models/product.schema';
import { SharedModule } from 'src/shared/shared.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema },]), SharedModule, AuthModule],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule { }
