import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, of } from 'rxjs';
import { Observable } from 'rxjs';
import { UserEntity } from 'src/user/user.entity';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    generateJWT(user: object): string {
        delete user['password'];
        return this.jwtService.sign({user});
    }

    hashPassword(password: string): string {
        const salt = genSaltSync(10);
        const hash = hashSync(password, salt);
        return hash;
    }

    comparePasswords(newPassword: string, passwordHash: string): boolean {
        return compareSync(newPassword, passwordHash);
    }
}
