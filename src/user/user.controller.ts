import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    register(@Body() body: object): object {
        return this.userService.register(body);
    }

    @Post('login')
    login(
        @Body('email') email: string, 
        @Body('password') password: string) {
        return this.userService.login(email, password);
    }
}