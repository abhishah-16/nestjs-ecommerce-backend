import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../shared/user.service';

@Controller('auth')
export class AuthController {
    constructor(private userservice: UserService) { }

    @Post('login')
    async login(@Body() userDto: any) {
        return await this.userservice.findByLogin(userDto)
    }

    @Post('signup')
    async signup(@Body() userDto: any) {
        return await this.userservice.create(userDto)
    }

}
