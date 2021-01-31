import { Body, HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "src/auth/services/auth.service";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private authService: AuthService
    ) {}

    register(user: object) {
        var password     = this.authService.hashPassword(user['password']);
        var newUser      = new UserEntity();
        newUser.name     = user['name'];
        newUser.email    = user['email'];
        newUser.password = password;
        
        return this.userRepository.save(newUser).catch((err) => {
            if (err.errno == 1062) {
                throw new HttpException('User with this credentials already exists!', 403);
            }
            if (err.errno == 1364) {
                throw new HttpException(err.sqlMessage, 500);
            }
        });
    }

    login(email: string, password: string) {
        const response = this.userRepository.findOne({select: ['id', 'name', 'email', 'password'], where : {email : email} }).then((user) => {
            if (user != undefined) {
                const passwordCompared = this.authService.comparePasswords(password, user.password);

                if (passwordCompared) {
                    const jwt_token = this.authService.generateJWT(user);
                    return {'success' : true, 'accessToken' : jwt_token};
                    
                } else {
                    throw new HttpException('Incorect password!', 403);
                }
            } else {
                throw new HttpException('The user doesn\'t exist!', 404);
            }
        });
        
        return response;
    }
}