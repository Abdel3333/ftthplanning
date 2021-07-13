import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthCredentialsDto } from './auth.credentials.dto';
import { AuthUser } from './authUser.schema';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from './interfaces/jwt-payload.interface';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('AuthUser') private authUserModel: Model<AuthUser>,
        private jwtService:JwtService,
        private configService: ConfigService
    ){}

    async createUser(authCredentials: AuthCredentialsDto):Promise<any>{
        const {firstName, lastName, phone, username, password} = authCredentials

        const user = new this.authUserModel()
        user.firstName = firstName
        user.lastName = lastName
        user.phone = phone
        user.username = username
        user.pwdsalt = await bcrypt.genSalt()
        user.password = await this.hashPassword(password, user.pwdsalt)

        try {
            await user.save()
            return Promise.resolve('user created')
        } catch (error) {
            if (error.code == 11000) throw new ConflictException(error,'user already exist')
            else {
                throw new InternalServerErrorException()
            }
        }
    }

    async validateUser(authCredentials: AuthCredentialsDto):Promise<{accessToken:string}>{
        const {username, password} = authCredentials
        const user = await this.authUserModel.findOne({username})

        if(user && await this.validatePwd(password, user)) {
            const payload: jwtPayload = {
                username,
                iat: Date.now(),
                userId: user._id,
            }
            const accessToken = await this.jwtService.sign(payload)
            //return user.username
            const returnUser = {
                accessToken,
                user:{
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phone: user.phone,
                    username: user.username,
                    profil: user.profil
                }
            }
            return Promise.resolve(returnUser)
        }
        else {
            throw new UnauthorizedException('invalid user')
        }
    }

    async checkToken(token: string) {
    
        if (! token) {
          throw new UnauthorizedException('token not found in header')
        }
        const decode = this.jwtService.decode(token)
        console.log('decode ---->', decode );
        const secret = this.configService.get<string>('jwt.secret')
        
        let verify;
        try {
          verify = await this.jwtService.verify(token,{
            secret,
            ignoreExpiration: false
          })
        } catch (error) {
          throw new UnauthorizedException(error)
        }
       
        const seconds = decode['exp'] - decode['iat']
        const exp = new Date(decode['iat'])
        exp.setSeconds(seconds)
        
        if ( exp.getTime() < Date.now()) {
          throw new UnauthorizedException
        }
        const user = await this.authUserModel.findOne({_id: decode['userId']})
        const returnUser = {
            accessToken: token,
            user:{
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                username: user.username,
                profil: user.profil
            }
        }
        return Promise.resolve(returnUser)
    }

    async validatePwd(password:string, user):Promise<Boolean>{
        const hash = await bcrypt.hash(password, user.pwdsalt)
        return hash === user.password
    }
    
    private async hashPassword(password: string, salt:string):Promise<string>{
        return bcrypt.hash(password, salt)
    }
}
