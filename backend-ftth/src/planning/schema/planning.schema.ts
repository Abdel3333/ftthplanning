import * as mongoose from 'mongoose'

export const PlanningSchema = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, ref: 'AuthUser',required: true},
    status: {type: String, enum:['pending', 'success', 'archived'], default: 'pending'},
    verificationId: {type: String},
    reference: {type:String},
    networkInfos: {
        environmentType: {type: String},
        areaType: {type: String},
        technology: {type: String},
        architecture: {type: String, enum:['waterfall', 'centralize']},
        globalRate: {type:Number},
        splitterN1: {type:Number},
        splitterN2: {type:Number},
        transportFiber: {type:Number},
        distributionFiber: {type:Number},
        penetrationRate: {type:Number},
    },
    studyFile: {type: String, required: true},
    pboData: {type: Array},
    sroData: {type: Object},
    nroData: {type: Object},
    homesData: {type: Array},
    removedHomes: {type: Array},

    
});

PlanningSchema.set('timestamps', true);

export interface Planning extends mongoose.Document {
    id: string;
    userId: string;
    status: string;
    verificationId: string;
    reference: string;
    networkInfos: {
        environmentType: string,
        areaType: string,
        technology: string,
        architecture: string,
        globalRate: number,
        splitterN1: number,
        splitterN2: number,
        transportFiber: number,
        distributionFiber: number,
        penetrationRate: number
    };
    studyFile: string;
    pboData: Array<any>;
    sroData: {};
    nroData: {};
    homesData: Array<any>;
    removedHomes: Array<any>;
}