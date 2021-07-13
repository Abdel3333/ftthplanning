import { Model } from '@vuex-orm/core'
//import Offer from './offer'

export default class User extends Model {

    static entity = 'user'
    static primaryKey = '_id'

    static fields() {
        return {
            _id: this.attr(null),
            firstName: this.attr(''),
            lastName: this.attr(''),
            phone: this.attr(''),
            username: this.attr(''),
            profil: this.attr(''),
        }
    }
}