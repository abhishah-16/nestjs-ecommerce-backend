import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../shared/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private userservice: UserService,
        private authservice: AuthService) { }


    @Get()
    @UseGuards(AuthGuard('jwt'))
    tempAuth() {
        return { auth: 'working!!!!' }
    }

    @Post('login')
    async login(@Body() userDto: any) {
        const user = await this.userservice.findByLogin(userDto)
        const payload = {
            username: user.username,
            seller: user.seller,
        }

        const token = await this.authservice.signPayload(payload)
        return { user, token }
    }

    @Post('signup')
    async signup(@Body() userDto: any) {
        const user = await this.userservice.create(userDto)
        const payload = {
            username: user.username,
            seller: user.seller,
        }
        const token = await this.authservice.validateUser(payload)
        return { user, token }
    }

}
