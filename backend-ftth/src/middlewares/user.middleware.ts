import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService
  ) {}
  async use(req: Request, res: Response, next: Function) {
    const authorization = req.get('Authorization')
    if(!authorization) throw new UnauthorizedException ('Not authenticated')

    const token = authorization.split(' ')[1]
    let response
    try {
      response = await this.authService.checkToken(token)
      next()
    } catch (error) {
      throw error
    }
  }
  
}