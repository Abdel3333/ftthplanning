import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import {AuthUserSchema} from './authUser.schema'
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'AuthUser', schema: AuthUserSchema}]),
    ConfigModule,
    JwtModule.register(
      {
        secret: 'hQSnyLKDdut66wzzc0QmvjviL02j_MFyDewnDVyanem4Qmm0m9Xfs7hWmp0N6buOShGZEEm-XcEDFs77EeMvS9NiDHSg66UfFzwcz3hiEthahRikH8K1hXz9qSXNVzdISjpgHhduIm5DGorFVYV6NYUEz297rmsiQG43FwbLUDg',
        signOptions: {
          expiresIn: 3600,
        }
      }
    ),
    PassportModule.register({defaultStrategy: 'jwt'})
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports:[JwtStrategy, PassportModule, AuthService]
})
export class AuthModule {}
