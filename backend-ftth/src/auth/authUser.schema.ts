import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'

export const AuthUserSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: String, required: true},
    username: {type: String, required: true, unique:true},
    profil: {type: String},
    password: {type: String, required: true},
    pwdsalt: {type: String},

    
});

AuthUserSchema.set('timestamps', true);

/* AuthUserSchema.methods.validatePwd = async function(password:string):Promise<Boolean>{
    const hash = await bcrypt.hash(password, this.pwdsalt)
    return hash === this.password
} */

export interface AuthUser extends mongoose.Document {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    username: string;
    profil: string;
    password: string;
    pwdsalt: string;
    //validatePwd(password:string): boolean;
}