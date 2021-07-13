<template>
    <div class="lg:px-12 px-6 pb-16 lg:py-9 py-6 h-full">
        <p class="text-lg font-bold mb-6">Planification semi-assistée</p>
        <div class="bg-white shadow-lg rounded-lg p-4 h-full">
            <p class="text-lg md:text-2xl font-bold text-center text-inkNormal-simple">Mise en place du réseau</p>
            <div class="flex items-center justify-center my-6">
                <div
                    :class="gte(1) ? 'bg-green-400' : 'bg-gray-100'"
                    class="rounded-full w-5 h-5"
                ></div>
                <div
                    :class="gte(2) ? 'bg-green-400' : 'bg-gray-100'"
                    class="h-2 w-12 "
                ></div>
                <div
                    :class="gte(2) ? 'bg-green-400' : 'bg-gray-100'"
                    class="rounded-full w-5 h-5 bg-gray-100 "
                ></div>
                <div
                    :class="gte(3) ? 'bg-green-400' : 'bg-gray-100'"
                    class="h-2 w-12 "
                ></div>
                <div
                    :class="gte(3) ? 'bg-green-400' : 'bg-gray-100'"
                    class="rounded-full w-5 h-5 bg-gray-100 "
                ></div>
            </div>
            <ValidationObserver v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(onSubmit)" class="sm:w-2/3 lg:w-2/3 xl:w-3/5 mx-auto mt-8">
                    <div v-if="step == 1">
                        <div class="flex justify-center space-x-16 mb-4">
                            <m-radio :radioButtonValue="'urbain'" :checked="area === 'urbain'" label="Milieu Urbain" name="milieu" v-model="area"></m-radio>
                            <m-radio :radioButtonValue="'rural'" :checked="area === 'rural'" label="Milieu Rural" name="milieu" v-model="area"></m-radio>
                        </div>
                        <div class="mb-4">
                            <label class="mb-2" for="">Zone d'étude</label>
                            <ValidationProvider name="la zone d'étude" rules="required" v-slot="{ errors }">
                                <m-select class="mt-2" :errors="errors[0]" :initialValue="zone" :options="studyZone" placeholder="Choisir une zone" v-model="zone"></m-select>
                            </ValidationProvider>
                        </div>
                        <div class="mb-4">
                            <label class="" for="">Fichier d'étude</label>
                            <ValidationProvider name="le fichier d'étude" rules="required" v-slot="{ errors }">
                                <m-file-input :accept="'.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'" :errors="errors[0]" :initialFile="studyFile" class="mt-2" v-model="studyFile"></m-file-input>
                            </ValidationProvider>
                        </div>
                    </div>
                    <div v-if="step == 2">
                        <div class="mb-4">
                            <label class="mb-2" for="">Technologie</label>
                            <ValidationProvider name="la technologie" rules="required" v-slot="{ errors }">
                                <m-select key="architecture" class="mt-2" :errors="errors[0]" :initialValue="technologyChoice" :options="technology" placeholder="Choisir une technologie" v-model="technologyChoice"></m-select>
                            </ValidationProvider>
                        </div>
                        <div class="mb-4">
                            <label for="" class="">Architecture</label>
                            <div class="flex space-x-16 mt-2">
                                <m-radio :radioButtonValue="'waterfall'" :checked="architecture === 'waterfall'" label="En Cascade" name="architecture" v-model="architecture"></m-radio>
                                <m-radio :radioButtonValue="'centralize'" :checked="architecture === 'centralize'" label="Centralisée" name="architecture" v-model="architecture"></m-radio>
                            </div>
                            <div v-if="architecture == 'waterfall'" class="mt-2 bg-yellowLighter-hover flex items-center px-2 py-4 text-xs space-x-2">
                                <span>
                                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.9264 19.5233L13.9375 4.68734C13.3713 3.63547 11.8628 3.63547 11.2961 4.68734L3.30768 19.5233C3.18473 19.7516 3.12309 20.008 3.12878 20.2672C3.13446 20.5265 3.20728 20.7799 3.34011 21.0027C3.47295 21.2254 3.66127 21.4099 3.88669 21.5382C4.11211 21.6664 4.36693 21.734 4.62628 21.7344H20.6055C20.865 21.7344 21.1202 21.6671 21.3459 21.539C21.5716 21.4109 21.7603 21.2265 21.8934 21.0037C22.0265 20.7809 22.0995 20.5273 22.1053 20.2678C22.1111 20.0084 22.0495 19.7518 21.9264 19.5233ZM12.6171 19.4375C12.4316 19.4375 12.2504 19.3825 12.0962 19.2795C11.942 19.1765 11.8219 19.0301 11.7509 18.8588C11.68 18.6875 11.6614 18.499 11.6976 18.3171C11.7337 18.1352 11.823 17.9682 11.9541 17.8371C12.0853 17.706 12.2523 17.6167 12.4342 17.5805C12.616 17.5443 12.8045 17.5629 12.9758 17.6339C13.1471 17.7048 13.2935 17.825 13.3966 17.9792C13.4996 18.1333 13.5546 18.3146 13.5546 18.5C13.5546 18.6231 13.5303 18.745 13.4832 18.8588C13.4361 18.9725 13.367 19.0759 13.28 19.1629C13.1929 19.25 13.0896 19.319 12.9758 19.3661C12.8621 19.4132 12.7402 19.4375 12.6171 19.4375ZM13.6352 10.0086L13.3661 15.7273C13.3661 15.9263 13.2871 16.117 13.1464 16.2577C13.0058 16.3983 12.815 16.4773 12.6161 16.4773C12.4172 16.4773 12.2264 16.3983 12.0858 16.2577C11.9451 16.117 11.8661 15.9263 11.8661 15.7273L11.5971 10.0109C11.591 9.87434 11.6125 9.73792 11.6603 9.60981C11.7081 9.48171 11.7812 9.36454 11.8753 9.26529C11.9693 9.16603 12.0824 9.08673 12.2077 9.03211C12.3331 8.97748 12.4681 8.94866 12.6049 8.94734H12.6147C12.7524 8.94727 12.8886 8.97509 13.0152 9.02912C13.1418 9.08316 13.2562 9.16228 13.3514 9.26172C13.4466 9.36116 13.5206 9.47886 13.5691 9.6077C13.6175 9.73655 13.6394 9.87388 13.6333 10.0114L13.6352 10.0086Z" fill="#FECC00"/>
                                    </svg>
                                </span>
                                <span>L'architecture en cascade implémentée ici est une architecture à deux niveaux</span>
                            </div>
                        </div>
                        <div class="mb-4">
                            <label class="mb-2" for="">Taux de couplage global</label>
                            <ValidationProvider name="le taux global" rules="required" v-slot="{ errors }">
                                <m-select class="mt-2" :errors="errors[0]" :initialValue="couplage" :options="couplingRate" placeholder="Choisir un taux" v-model="couplage"></m-select>
                            </ValidationProvider>
                        </div>
                        <div v-if="couplage" class="mb-4 border-2 border-dashed border-borderColor rounded-md p-4">
                            <p class="mb-2">Emplacement et type de coupleur</p>
                            <div class="flex justify-between space-x-3">
                                <div class="w-1/2">
                                    <label class="text-sm" for="">Sous Répartiteur Optique</label>
                                    <ValidationProvider name="le SRO" rules="required" v-slot="{ errors }">
                                        <m-select key="sro" class="mt-2" :errors="errors[0]" :initialValue="sroSplitter" :options="SplitterInSro" placeholder="Choisir un coupleur" v-model="sroSplitter"></m-select>
                                    </ValidationProvider>
                                </div>
                                <div v-if="architecture == 'waterfall'" class="w-1/2">
                                    <label class="text-sm" for="">Point de Branchement Optique</label>
                                    <ValidationProvider name="le PBO" rules="required" v-slot="{ errors }">
                                        <m-select key="pbo" class="mt-2" :errors="errors[0]" :initialValue="pboSplitter" :options="SplitterInPbo" placeholder="Choisir un coupleur" v-model="pboSplitter"></m-select>
                                    </ValidationProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="step == 3">
                        <div class="mb-4">
                            <ValidationProvider name="Le taux de pénétration" rules="required|numeric|min_value:10|max_value:100" v-slot="{ errors }">
                                <m-input name = "peneRate" :errors="errors[0]" v-model="penetrationRate" type="number" min="10" max="100" label="Taux de pénétration (compris entre 10 et 100)"/>
                            </ValidationProvider>
                        </div>
                        <div class="mb-4">
                            <label class="mb-2" for="">Câble de transport</label>
                            <ValidationProvider name="le câble de transport" rules="required" v-slot="{ errors }">
                                <m-select key="trans" class="mt-2" :errors="errors[0]" :initialValue="tCable" :options="transportCable" placeholder="Choisir une option" v-model="tCable"></m-select>
                            </ValidationProvider>
                        </div>
                        <div class="mb-4">
                            <label class="mb-2" for="">Câble de distribution</label>
                            <ValidationProvider name="le câble de distribution" rules="required" v-slot="{ errors }">
                                <m-select key="dist" class="mt-2" :errors="errors[0]" :initialValue="dCable" :options="distributionCable" placeholder="Choisir une option" v-model="dCable"></m-select>
                            </ValidationProvider>
                        </div>
                    </div>
                    <div class="flex justify-between w-full text-xs sm:text-sm lg:text-base">
                        <MButton v-if="step != 1" @click="step--" :classes="'rounded-l30 border border-black py-1.5 px-8 w-full'" :text="'Retour'"></MButton>
                        <MButton type="submit" :classes="'rounded-l30 bg-blueLighter-active py-1.5 px-8 w-full'" load :activateLoad="request" :text="step == 3 ? 'Lancer la planification':'Valider'"></MButton>
                    </div>
                </form>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>

//import EmptyCard from '@/components/card/EmptyCard.vue'
import axios from 'axios'
import User from '../../store/models/user'
export default {
    components: {
        //EmptyCard
    },
    data() {
        return {
            step: 1,
            studyZone:[
                {label:'Commerciale'},
                {label:'Résidentielle'},
                {label:'Industrielle'},
            ],
            technology:[
                {label:'EPON'},
                {label:'GPON 1.5'},
                {label:'GPON 2.5'},
            ],
            couplingRate:[
                {label:'1:32', value: 32},
                {label:'1:64', value: 64},
            ],
            /* splitter:[
                {label:'1:2', value: 2},
                {label:'1:4', value: 4},
                {label:'1:8', value: 8},
                {label:'1:16', value: 16},
                {label:'1:32', value: 32},
                {label:'1:64', value: 64},
            ], */
            transportCable:[
                {label:'500 m', value: 500},
                {label:'1 km', value: 1000},
                {label:'2 km', value: 2000},
            ],
            distributionCable:[
                {label:'500 m', value: 500},
                {label:'1 km', value: 1000},
                {label:'2 km', value: 2000},
            ],
            area: 'urbain',
            zone: '',
            studyFile: '',
            technologyChoice: '',
            architecture: 'waterfall',
            couplage: null,
            sroSplitter: null,
            pboSplitter: null,
            tCable: null,
            dCable: null,
            penetrationRate: 100,
            request: false,
        }
    },
    computed: {
        user(){
            return User.query().first()
        },
        SplitterInSro(){
            if (this.couplage == 32 && this.architecture == "waterfall") {
                return [
                    {label:'1:4', value: 4},
                    {label:'1:8', value: 8},
                    {label:'1:16', value: 16}
                ]
            }
            else if (this.couplage == 64 && this.architecture == "waterfall") {
                return [
                    {label:'1:4', value: 4},
                    {label:'1:8', value: 8},
                    {label:'1:16', value: 16},
                    {label:'1:32', value: 32},
                ]
            }
            return [
                {label:`1:${this.couplage}`, value: this.couplage}
            ]
        },
        SplitterInPbo(){
            if(this.couplage != null && this.sroSplitter != null) {
               const split = this.couplage / this.sroSplitter
            
                return [
                    {label:`1:${split}`, value: split}
                ] 
            }
            return []
        }
    },
    methods: {
        gte(step) {
            return this.step >= step;
        },
        onSubmit(){
            if(this.step < 3) this.step++
            else {
                this.request = true
                axios.post(`/planning`,{
                    userId: this.user._id,
                    networkInfos: {
                        environmentType: this.zone,
                        areaType: this.area,
                        technology: this.technologyChoice,
                        architecture: this.architecture,
                        globalRate: this.couplage,
                        splitterN1: this.sroSplitter,
                        splitterN2: this.pboSplitter,
                        transportFiber: this.tCable,
                        distributionFiber: this.dCable,
                        penetrationRate: this.penetrationRate || 100
                    },
                    studyFile: this.studyFile,
                })
                .then(res=> {
                    this.request = false
                    console.log(res)
                    this.$router.push('/dashboard/planningsRecap')
                })
                .catch(err=> {
                    this.request = false
                    console.log(err.response.data)
                })
            }

        }
    },
}
</script>

<style scoped>

</style>