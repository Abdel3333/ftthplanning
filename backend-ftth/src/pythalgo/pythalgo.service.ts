import { ForbiddenException, HttpService, Injectable, ServiceUnavailableException } from '@nestjs/common';

var zoneDiameter = 100
@Injectable()
export class PythalgoService {
    constructor(
        private httpService:HttpService,
        //private configService:ConfigService
    ){}

    async checkDistance(nroCoords, homesCoords):Promise<any>{
        try {
            const response = await this.httpService.axiosRef({
                method: 'post',
                url: `http://localhost:18100/check?nro_lon=${nroCoords.lon}&nro_lat=${nroCoords.lat}`,
                data : homesCoords
            })
            //console.log(response.data)
            return Promise.resolve(response.data)
        } catch (error) {
            console.log('error --->',error)
            throw new ForbiddenException(error,'pyAlgo unavailable')
        }
    }

    async waterFall(nroCoords,confData, homesCoords):Promise<any>{
        try {
            const response = await this.httpService.axiosRef({
                method: 'post',
                url: `http://localhost:18100?architecture=0&pbo_max_port=${confData.pboMaxPorts}&nro_lon=${nroCoords.lon}&nro_lat=${nroCoords.lat}&pinD=${confData.pinD}&pinT=${confData.pinT}&penetrationRate=${confData.penetrationRate}&zoneDiameter=${zoneDiameter}`,
                data : homesCoords 
            })
            console.log(response.data)
            return Promise.resolve(response.data)
        } catch (error) {
            console.log('error --->',error)
            throw new ForbiddenException(error,'pyAlgo unavailable')
        }
    }

    async centralize(nroCoords, confData, homesCoords):Promise<any>{
        try {
            const response = await this.httpService.axiosRef({
                method: 'post',
                url: `http://localhost:18100?architecture=1&nro_lon=${nroCoords.lon}&nro_lat=${nroCoords.lat}&pinD=${confData.pinD}&pinT=${confData.pinT}&penetrationRate=${confData.penetrationRate}&zoneDiameter=${zoneDiameter}`,
                data : homesCoords 
            })
            console.log(response.data)
            return Promise.resolve(response.data)
        } catch (error) {
            console.log('error --->',error)
            throw new ForbiddenException(error,'pyAlgo unavailable')
        }
        
    }

    async verifyPlanning(id):Promise<any>{
        try {
            const response = await this.httpService.axiosRef({
                method: 'get',
                url: `http://localhost:18100/check_request?id=${id}`,
            })
            console.log(response.data)
            return Promise.resolve(response.data)
        } catch (error) {
            console.log('error --->',error)
            throw new ForbiddenException(error,'pyAlgo unavailable')
        }
    }

    
}
