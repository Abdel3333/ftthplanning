import { Model } from '@vuex-orm/core'

export default class Planning extends Model {

    static entity = 'planings'
    static primaryKey = '_id'

    static fields() {
        return {
            _id: this.attr(null),
            userId: this.attr(null),
            status: this.attr(''),
            verificationId: this.attr(''),
            reference: this.attr(''),
            networkInfos: this.attr(''),
            studyFile: this.attr(''),
            pboData: this.attr(''),
            sroData: this.attr(''),
            nroData: this.attr(''),
            homesData: this.attr(''),
            removedHomes: this.attr(''),
        }
    }
}