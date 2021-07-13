import { Body, Controller, Post, Req, UseGuards, ValidationPipe, UnauthorizedException, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialsDto } from './auth.credentials.dto';
import { AuthService } from './auth.service';
import { AuthUser } from './authUser.schema';
import { GetUser } from './get-user.decorator';
import { Request, Response } from "express";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}
    
    @Post('sign_up')
    signUp(@Body(ValidationPipe) authCredentials: AuthCredentialsDto):Promise<void>{
        return this.authService.createUser(authCredentials)
    }

    @Post('sign_in')
    signIn(@Body() authCredentials: AuthCredentialsDto):Promise<any>{
        return this.authService.validateUser(authCredentials)
    }

    @Get('me')
    async checkTocken(@Req() req: Request){
        const authHeader = req.get('Authorization')
        if(!authHeader) throw new UnauthorizedException('Not authenticated')
        const token = authHeader.split(' ')[1]; 
        return this.authService.checkToken(token)
    }
    /* @UseGuards(AuthGuard())
    @Post('test')
    test(@GetUser() user: AuthUser){
        console.log(user)
    } */
}
