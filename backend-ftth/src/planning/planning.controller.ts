import { MutPlanningDto } from './dto/mut-planning.dto';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreatePlanningDto } from './dto/create-planning.dto';
import { PlanningService } from './planning.service';

@Controller('planning')
export class PlanningController {
    constructor(
        private planningService: PlanningService
    ){}

    @Post()
    async makePlanning(@Body() createPlanningDto: CreatePlanningDto):Promise<any>{
       return this.planningService.makePlanning(createPlanningDto)
    }

    @Get(':userId')
    async allOrders(@Param('userId') userId:string, @Query('page') page: number, @Query() query: any) : Promise<any> {
      return this.planningService.getUserPlannings(userId, page, query)
    }
    
    /* @Get('')
    async getPlannings(@Param('userId') userId:string):Promise<any>{
       return this.planningService.getPlannings(userId)
    } */

    @Post('status')
    async mutPlanning(@Body() mutPlanningDto: MutPlanningDto):Promise<any>{
        return this.planningService.mutPlanningStatus(mutPlanningDto)
    }
}
