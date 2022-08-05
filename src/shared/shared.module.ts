import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
