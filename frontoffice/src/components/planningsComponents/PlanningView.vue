<template>
    <div class="lg:px-12 px-6 pb-16 lg:py-9 py-6 h-full">
        <p class="text-lg md:text-2xl mb-4 md:mb-6">Projet N°{{planningId}}</p>
        <div class="flex flex-col space-y-4 lg:space-y-6">
            <empty-card>
                <div slot="body" class="p-4 md:p-5">
                    <Map :planning="planning" class="mb-4" :mapHeight="'800px'"></Map>
                    <div class="flex justify-end">
                        <MButton :classes="'shadow-md text-sm md:text-base rounded bg-blueLighter-active py-2 px-3'" :text="'Agrandir la carte'"></MButton>
                    </div>
                </div>
            </empty-card>

            <div class="grid lg:grid-cols-3 gap-4 lg:gap-6">
                <empty-card class="lg:col-span-1">
                    <div slot="body" class="p-4 md:p-5">
                        <p class="text-lg font-bold mb-4">Informations du réseau</p>
                        <div>
                            <table class="hidden xl:block">
                                <tbody class="text-inkDark">
                                    <tr >
                                        <td class=" pt-0 py-1">Milieu d'étude: </td>
                                        <td class="font-bold px-8 capitalize">{{ planning.networkInfos.areaType }}</td>
                                    </tr>
                                    <tr>
                                        <td class=" py-1">Zone d'étude: </td>
                                        <td class="font-bold px-8 capitalize">{{ planning.networkInfos.environmentType }}</td>
                                    </tr>
                                    <tr>
                                        <td class=" py-1">Technologie: </td>
                                        <td class="font-bold px-8 capitalize">{{ planning.networkInfos.technology }}</td>
                                    </tr>
                                    <tr >
                                        <td class=" py-1">Architecture: </td>
                                        <td class="font-bold px-8">{{ planning.networkInfos.architecture == 'waterfall' ? 'En Cascade' : 'Centralisée' }}</td>
                                    </tr>
                                    <tr>
                                        <td class=" py-1">Taux de couplage global: </td>
                                        <td class="font-bold px-8">1:{{ planning.networkInfos.globalRate }}</td>
                                    </tr>
                                    <tr>
                                        <td class=" py-1">Type de coupleur au SRO: </td>
                                        <td class="font-bold px-8">1:{{ planning.networkInfos.splitterN1 }}</td>
                                    </tr>
                                    <tr v-if="planning.networkInfos.architecture == 'waterfall'">
                                        <td class="pb-0 py-1">Type de coupleur au PBO: </td>
                                        <td class="font-bold px-8">1:{{ planning.networkInfos.splitterN2 }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="xl:hidden flex flex-col space-y-3 lg:space-y-5 text-inkDark">
                                <p class="xl:space-x-16 flex flex-col space-y-1 xl:space-y-0 xl:flex-row justify-between">
                                    <span class="">Milieu d'étude: </span>
                                    <span class="font-bold">{{ planning.networkInfos.areaType }}</span>
                                </p>
                                <p class="xl:space-x-16 flex flex-col space-y-1 xl:space-y-0 xl:flex-row justify-between">
                                    <span class="">Zone d'étude: </span>
                                    <span class="font-bold">{{ planning.networkInfos.environmentType }}</span>
                                </p>
                                <p class="xl:space-x-16 flex flex-col space-y-1 xl:space-y-0 xl:flex-row justify-between">
                                    <span class="">Technologie: </span>
                                    <span class="font-bold">{{ planning.networkInfos.architecture }}</span>
                                </p>
                                <p class="xl:space-x-16 flex flex-col space-y-1 xl:space-y-0 xl:flex-row justify-between">
                                    <span class="">Architecture: </span>
                                    <span class="font-bold">{{ planning.networkInfos.architecture == 'waterfall' ? 'En Cascade' : 'Centralisée' }}</span>
                                </p>
                                <p class="xl:space-x-16 flex flex-col space-y-1 xl:space-y-0 xl:flex-row justify-between">
                                    <span class="">Taux de couplage global: </span>
                                    <span class="font-bold">1:{{ planning.networkInfos.globalRate }}</span>
                                </p>
                                <p class="xl:space-x-16 flex flex-col space-y-1 xl:space-y-0 xl:flex-row justify-between">
                                    <span class="">Type de coupleur au SRO: </span>
                                    <span class="font-bold">1:{{ planning.networkInfos.splitterN1 }}</span>
                                </p>
                                <p v-if="planning.networkInfos.architecture == 'waterfall'" class="xl:space-x-16 flex flex-col space-y-1 xl:space-y-0 xl:flex-row justify-between">
                                    <span class="">Type de coupleur au PBO: </span>
                                    <span class="font-bold">1:{{ planning.networkInfos.splitterN2 }}</span>
                                </p>
                            </div>
                         </div>
                    </div> 
                </empty-card>
                <empty-card class="lg:col-span-2">
                    <div slot="body" class="p-4 md:p-5">
                        <p class="text-lg font-bold mb-4">Inventaire des composants du réseau</p>
                        <table class="w-full table-auto shadow-lg">
                            <thead class="font-bold text-justify ">
                                <th class="p-2 ">Composant</th>
                                <th>Qte</th>
                                <th>Prix unitaire</th>
                                <th>Prix total</th>
                            </thead>
                            <tbody>
                                <tr :class="[i%2==0 ? 'bg-gray5': '','']" v-for="(item , i) in networkComponentRecap" :key="i">
                                    <td class="p-2">{{ item.component }}</td>
                                    <td>{{ item.qty }}</td>
                                    <td>{{ item.unitPrice }}</td>
                                    <td>{{ item.qty*item.unitPrice }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div> 
                </empty-card>
            </div>
            <div>
                <empty-card>
                    <div slot="body" class="p-4 md:p-5">
                        <p class="text-lg font-bold mb-4">Emplacement des cabinets et inventaire des câbles</p>
                        <div class="grid lg:grid-cols-3 gap-4 lg:gap-6">
                            <div class="lg:col-span-1 lg:max-h-280 lg:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                <table class="w-full table-auto shadow-lg">
                                    <thead class="font-bold text-justify ">
                                        <th class="p-2 ">Composant</th>
                                        <th>Coordonnées</th>
                                    </thead>
                                    <tbody>
                                        <tr class="bg-inkNormal-active text-white">
                                            <td class="p-2">NRO</td>
                                            <td>{{planning.nroData.lat}}, {{planning.nroData.lon}}</td>
                                        </tr>
                                        <tr class="bg-inkNormal-hover text-white">
                                            <td class="p-2">SRO</td>
                                            <td>{{planning.sroData.lat}}, {{planning.sroData.lon}}</td>
                                        </tr>
                                        <tr :class="[i%2==0 ? 'bg-gray5': '','']" v-for="(pbo , i) in planning.pboData" :key="i">
                                            <td class="p-2">PBO_{{i+1}}</td>
                                            <td>{{pbo.lat}}, {{pbo.lon}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="lg:col-span-2">
                                <table class="w-full table-auto shadow-lg">
                                    <thead class="font-bold text-justify ">
                                        <th class="p-2 ">Câbles optiques</th>
                                        <th>Qte (m)</th>
                                        <th>Rouleau de câble</th>
                                        <th>Nombre de fibre/câble</th>
                                        <th>Prix unitaire</th>
                                        <th>Prix total</th>
                                    </thead>
                                    <tbody>
                                        <tr :class="[i%2==0 ? 'bg-gray5': '','']" v-for="(cable , i) in cableInventory" :key="i">
                                            <td class="p-2">{{ cable.component }}</td>
                                            <td>{{ cable.qty }}</td>
                                            <td>{{ cable.rouleau }}</td>
                                            <td>{{ cable.fiberPerCable }}</td>
                                            <td>{{ cable.unitPrice }}</td>
                                            <td>{{ cable.unitPrice  }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div> 
                </empty-card>
            </div>
        </div>
    </div>
</template>

<script>
import Map from '../../pages/dashboard/components/Map.vue'
import Planning from '../../store/models/planning'
import EmptyCard from '../card/EmptyCard.vue'
export default {
    components: { EmptyCard, Map },
    data() {
        return {
            planningId: '',
        }
    },
    computed: {
        planning(){
            return Planning.find(this.planningId)
        },
        networkComponentRecap(){
            if (this.planning.networkInfos.architecture == 'waterfall'){
                return [
                    {component: 'Noeud de raccordement optique', qty: 1, unitPrice: 45},
                    {component: 'Sous répartiteur optique', qty: 1, unitPrice: 45},
                    {component: 'Point de branchement optique', qty: this.planning.pboData.length, unitPrice: 45},
                    {component: 'Coupleur de niveau 2', qty: this.planning.pboData.length, unitPrice: 45},
                    {
                        component: 'Coupleur de niveau 1', 
                        qty: this.numberOfSplitterN1, 
                        unitPrice: 45
                    },
                    {component: 'Carte PON', qty: Math.ceil(this.numberOfSplitterN1/8), unitPrice: 45}
                ] 
            }
            return [
                {component: 'Noeud de raccordement optique', qty: 1, unitPrice: 45},
                {component: 'Sous répartiteur optique', qty: 1, unitPrice: 45},
                {
                    component: 'Coupleur de niveau 1', 
                    qty: this.numberOfSplitterN1, 
                    unitPrice: 45
                },
                {component: 'Carte PON', qty: Math.ceil(this.numberOfSplitterN1/8), unitPrice: 45}
            ] 
        },
        cableInventory(){
            if (this.planning.networkInfos.architecture == 'waterfall'){
                return [
                    {component: 'Câbles de branchement', qty: this.inventoryOfCableData.branchement, rouleau: Math.ceil(this.inventoryOfCableData.branchement/1000)+' (de 1km)', fiberPerCable: 1, unitPrice: 45},
                    {component: 'Câbles de distribution', qty: this.inventoryOfCableData.distribution, rouleau: Math.ceil(this.inventoryOfCableData.distribution/this.planning.networkInfos.distributionFiber)+' (de '+this.planning.networkInfos.distributionFiber +'m)', fiberPerCable: this.distFiber, unitPrice: 45},
                    {component: 'Câbles de transport', qty: this.inventoryOfCableData.transport, rouleau: Math.ceil(this.inventoryOfCableData.transport/this.planning.networkInfos.transportFiber)+' (de '+this.planning.networkInfos.transportFiber +'m)', fiberPerCable: this.transFiber, unitPrice: 45},
                ] 
            }
            return [
                {component: 'Câbles de distribution', qty: this.inventoryOfCableData.distribution, rouleau: Math.ceil(this.inventoryOfCableData.distribution/this.planning.networkInfos.distributionFiber)+' (de '+this.planning.networkInfos.distributionFiber +'m)', fiberPerCable: this.distFiber, unitPrice: 45},
                {component: 'Câbles de transport', qty: this.inventoryOfCableData.transport, rouleau: Math.ceil(this.inventoryOfCableData.transport/this.planning.networkInfos.transportFiber)+' (de '+this.planning.networkInfos.transportFiber +'m)', fiberPerCable: this.transFiber, unitPrice: 45},
            ] 
        },
        numberOfSplitterN1(){
            if(this.planning.networkInfos.architecture == 'waterfall') return Math.ceil(this.planning.pboData.length/this.planning.networkInfos.splitterN1)
            else {
                let n1 = 0
                this.planning.homesData.forEach(home => {
                    n1+=home.need
                });
                return Math.ceil(n1/this.planning.networkInfos.splitterN1)
                
            }
        },
        inventoryOfCableData(){
            if(this.planning.networkInfos.architecture == 'waterfall'){
                let branchTotalMeter = 0
                this.planning.homesData.forEach(home => {
                    //console.log(home);
                    branchTotalMeter+=parseFloat(home.done) * home.distance
                });
                const branchement = Math.ceil(branchTotalMeter)
                let distTotalMeter = 0
                this.planning.pboData.forEach(pbo => {
                    distTotalMeter+=pbo.distance
                });
                const distribution = Math.ceil(distTotalMeter)
                const transport = Math.ceil(this.planning.nroData.distance)
                return {
                    branchement,
                    distribution,
                    transport
                }
            }
            
            else {
                let n1 = 0
                this.planning.homesData.forEach(home => {
                    n1+=home.need*home.distance
                });
                const distribution = Math.ceil(n1)
                const transport = Math.ceil(this.planning.nroData.distance)
                return {
                    distribution,
                    transport
                }
            }
        },
        distFiber(){
            const core = [4,6,8,12,24,48,96]
            if (this.planning.networkInfos.architecture == 'waterfall'){
                
                let fiberNb= core.find(cor => {
                    return cor > this.planning.pboData.length
                });
                return fiberNb
            }

            /* let fiberNb= core.find(cor => {
                return cor > this.planning.pboData.length
            }); */
            return 4
        },
        transFiber(){
            const core = [4,6,8,12,24,48,96]
            let fiberNb= core.find(cor => {
                return cor > this.numberOfSplitterN1
            });
            return fiberNb
        }
    },
    methods: {
        
    },
    mounted() {
        this.planningId = this.$route.params.planningId
    },
}
</script>