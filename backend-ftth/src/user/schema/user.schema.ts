import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    telephone: {type: String, required: true},
});

UserSchema.set('timestamps', true);

/* UserSchema.pre('save', function() {

}); */
export interface User extends mongoose.Document {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
}