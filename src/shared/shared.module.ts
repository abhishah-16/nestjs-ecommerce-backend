import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from 'src/models/order.schema';
import { ProductSchema } from 'src/models/product.schema';
import { UserSchema } from 'src/models/user.schema';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  exports: [UserService],
  imports: [MongooseModule.forFeature([
    { name: 'User', schema: UserSchema }
   ])]
})
export class SharedModule { }
