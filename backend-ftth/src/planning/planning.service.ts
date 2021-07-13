import { MutPlanningDto } from './dto/mut-planning.dto';
import { ForbiddenException, HttpService, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Planning } from './schema/planning.schema';
const readXlsxFile = require('read-excel-file/node');
const fs = require('fs')
import { join } from 'path';
import { PythalgoService } from 'src/pythalgo/pythalgo.service';
import { CreatePlanningDto } from './dto/create-planning.dto';
import { ImageUploadService } from 'src/image-upload/image-upload.service';
import { Cron } from '@nestjs/schedule';
import { customAlphabet } from 'nanoid'
const nanoidReference = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 14)

@Injectable()
export class PlanningService {
    constructor(
        private httpService:HttpService,
        private pythalgoService:PythalgoService,
        private imageUploadService:ImageUploadService,
        @InjectModel('Planning') private planningModel: Model<Planning>,
    ){}

    /* async getPlannings(userId:string):Promise<any>{
        return this.planningModel.find()
    } */

    async getUserPlannings(userId:string, page = 1, query){
        let perPage;
        let total;
        let totalPage;
        let data;
        if (query.perPage) {
          perPage = typeof query.perPage === 'string' ? +query.perPage : query.perPage;
        }
        const filterQuery: any = {userId: userId}
        const status =  query.status
        if (status) {
          filterQuery.status = status
        }
        const search = query.search
        if (search) {
          filterQuery.$or = [{'reference': new RegExp(search, 'i')}]
        }
        const skip = (page - 1) * perPage
        const mongooseQuery = this.planningModel.find(filterQuery).sort({createdAt: -1})
        if (skip && !isNaN(skip)) {
          mongooseQuery.skip(skip)
        }
        
        if (perPage) {
          mongooseQuery.limit(perPage)
        }
        total = await this.planningModel.countDocuments(filterQuery).exec()
        data = await mongooseQuery.exec()
        if (total > 0) {
          totalPage = Math.ceil(total/perPage)
        }
        const pagination: any = {
          total,
          currentPage: +page,
          totalPage
        }
        if (perPage) {
          pagination.perPage = perPage
          pagination.docsOnPage = data.length
        }
        
        return {
          total,
          totalPage,
          pagination,
          data
        }
    }

    async mutPlanningStatus(mutPlanningDto: MutPlanningDto):Promise<any>{
        const findPlanning = await this.planningModel.findOne({_id: mutPlanningDto.planningId})
        if(!findPlanning) throw new NotFoundException('planning not found')
        findPlanning.status = mutPlanningDto.status
        findPlanning.save()
        return Promise.resolve(findPlanning)
    }


    async makePlanning(createPlanningDto: CreatePlanningDto):Promise<any>{
        let file
        let nroCoords
        let homesCoords = []
        //console.log('dto=>....',createPlanningDto)
        try {
            file = await readXlsxFile(await this.imageUploadService.readStream(createPlanningDto.studyFile))
        } catch (error) {
            console.log('filerr', error)
            throw new ForbiddenException(error, 'error in file converting')
        }
        //console.log(file)

        nroCoords = {
            lat: file[1][0],
            lon: file[1][1]
        }
        for(let i=2; i<file.length; i++) {
            homesCoords.push({
                point: {
                    lat: file[i][0],
                    lon: file[i][1]
                },
                need: file[i][2] || 1,
                percent: file[i][3] || 1
            })
        }
        const checkNro_Homes_distance = await this.pythalgoService.checkDistance(nroCoords, homesCoords)
        console.log('chec',checkNro_Homes_distance);
        
        if(checkNro_Homes_distance.length == 0) {
            if(createPlanningDto.networkInfos.architecture == 'waterfall'){
                const confData = {
                    pboMaxPorts: createPlanningDto.networkInfos.splitterN2,
                    pinD: createPlanningDto.networkInfos.distributionFiber - 50,
                    pinT: createPlanningDto.networkInfos.transportFiber - 50,
                    penetrationRate: createPlanningDto.networkInfos.penetrationRate || 100
                }
                const launchPlanning = await this.pythalgoService.waterFall(nroCoords, confData, homesCoords)
                if (launchPlanning){
                    const planning = new this.planningModel()
                    planning.verificationId = launchPlanning.id
                    planning.userId = createPlanningDto.userId
                    planning.studyFile = createPlanningDto.studyFile
                    planning.networkInfos = createPlanningDto.networkInfos
                    planning.reference = nanoidReference()
                    await planning.save()
                    return Promise.resolve('planning launch succeeded')
                }
            }
            else {
                const confData = {
                    pinD: createPlanningDto.networkInfos.distributionFiber - 50,
                    pinT: createPlanningDto.networkInfos.transportFiber - 50,
                    penetrationRate: createPlanningDto.networkInfos.penetrationRate || 100
                }
                const launchPlanning = await this.pythalgoService.centralize(nroCoords, confData, homesCoords)
                if (launchPlanning){
                    const planning = new this.planningModel()
                    planning.verificationId = launchPlanning.id
                    planning.userId = createPlanningDto.userId
                    planning.studyFile = createPlanningDto.studyFile
                    planning.networkInfos = createPlanningDto.networkInfos
                    planning.reference = nanoidReference()
                    await planning.save()
                    return Promise.resolve('planning launch succeeded')
                }
            }
        }
        else {
            return Promise.reject({
                code: 403,
                message: 'those homes did\'nt respect distance',
                homesNotRespected: checkNro_Homes_distance
            })
        }
        
        //console.log(JSON.stringify(homesCoords))
        //this.pythalgoService.verifyPlanning('7523b6c8-896d-4cd0-b764-7d3a37603c06')
        //console.log(nroCoords)
    }

    @Cron('45 * * * * *')
    async handleCron() {
        console.log('run cron');
        const getPendingPlannings = await this.planningModel.find({status: 'pending'})
        getPendingPlannings.forEach(async planning => {
            const getPlanningresult = await this.pythalgoService.verifyPlanning(planning.verificationId)
            
            if (getPlanningresult == "En cours") return
            else {
                if (planning.networkInfos.architecture == "waterfall") {
                    let pbosCoords
                    let homesCoords:Array<any>
                    planning.nroData = getPlanningresult.solution.nro
                    planning.sroData = getPlanningresult.solution.sro
                    pbosCoords = getPlanningresult.solution.pbos
                    pbosCoords.forEach(pbo => {
                        const homes = pbo.homes
                        if(homesCoords)  homesCoords = [...homesCoords, ...homes]
                        else {
                            homesCoords = [...homes]
                        }
                    });
                    planning.pboData = getPlanningresult.solution.pbos
                    planning.homesData = homesCoords
                    planning.removedHomes = getPlanningresult.removed
                    planning.status = "success"
                    await planning.save()
                }
                else {
                    let homesCoords:Array<any>
                    planning.nroData = getPlanningresult.solution.nro
                    planning.sroData = {
                        lat: getPlanningresult.solution.lat,
                        lon: getPlanningresult.solution.lon
                    }
                    homesCoords = getPlanningresult.solution.homes

                    //planning.pboData = getPlanningresult.solution.pbos
                    planning.homesData = homesCoords
                    planning.removedHomes = getPlanningresult.removed
                    planning.status = "success"
                    await planning.save()
                }
            }
        });
    }
}
