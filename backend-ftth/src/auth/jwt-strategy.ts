import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import {PassportStrategy} from '@nestjs/passport'
import { Model } from 'mongoose'
import {Strategy,ExtractJwt } from 'passport-jwt'
import { AuthUser } from './authUser.schema'
import { jwtPayload } from './interfaces/jwt-payload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel('AuthUser') private auhUserModel: Model<AuthUser>,
        private configService: ConfigService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'hQSnyLKDdut66wzzc0QmvjviL02j_MFyDewnDVyanem4Qmm0m9Xfs7hWmp0N6buOShGZEEm-XcEDFs77EeMvS9NiDHSg66UfFzwcz3hiEthahRikH8K1hXz9qSXNVzdISjpgHhduIm5DGorFVYV6NYUEz297rmsiQG43FwbLUDg'
        })
    }

    async validate(payload:jwtPayload):Promise<AuthUser> {
        const {username} = payload
        const user = await this.auhUserModel.findOne({username})

        if(!user) throw new UnauthorizedException('invalid user')

        return user
    }
}