import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    phone: string;

    @IsEmail()
    username: string;

    @IsString()
    @MinLength(8)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message: 'password too week'}
    )
    password: string
}