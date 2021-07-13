export class CreatePlanningDto {
    userId: string;
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
}