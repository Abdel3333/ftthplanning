import { createParamDecorator } from "@nestjs/common";
import { AuthUser } from "./authUser.schema";

export const GetUser = createParamDecorator((data, req): AuthUser=> {
    return req.user
})