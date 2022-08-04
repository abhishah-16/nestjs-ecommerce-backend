import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import 'dotenv/config'

@Module({
  imports: [MongooseModule.forRoot(process.env.DATABASE_URL), SharedModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
