import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto, RegisterDto } from 'src/auth/auth.dto';
import { User } from 'src/types/user';
import * as bcrypt from 'bcrypt'
import e from 'express';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) { }

    private santizieUser(user: User) {
        return user.depopulate('password')
    }

    async create(data: RegisterDto) {
        const { username } = data
        const user = await this.userModel.findOne({ username })
        if (user) {
            throw new HttpException('User Already Exists', HttpStatus.BAD_REQUEST)
        }
        const createUser = new this.userModel(data)
        await createUser.save()
        return this.santizieUser(createUser)
    }

    async findByLogin(data: LoginDto) {
        const { username, password } = data
        const user = await this.userModel.findOne({ username })
        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
        }
        if (await bcrypt.compare(password, user.password)) {
            return this.santizieUser(user)
        } else {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
        }
    }
}
