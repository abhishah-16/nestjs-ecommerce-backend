import { Controller } from '@nestjs/common';
import { UserService } from '../shared/user.service';

@Controller('auth')
export class AuthController {
    constructor(private userservice: UserService) { }
}
