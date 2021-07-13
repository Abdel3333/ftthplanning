<template>
    <div class="lg:px-12 px-6 pb-16 lg:py-9 py-6 h-full">
        <p class="font-bold text-lg ">Mes projets archivés</p>
        <div class="flex justify-between items-center">
            <div class="my-4 md:my-6 px-2 sm:px-4 py-2 sm:py-3.5 lg:w-328 bg-white flex justify-between items-center text-sm text-inkNormal-simple rounded-md">
                <input @input="onSearch" class="w-full focus:outline-none" v-model="searchText" type="text" placeholder="Rechercher">
                <span>
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.4033 15.263L13.0952 12.8582C14.8974 10.4368 14.7077 6.98721 12.6368 4.81461C11.546 3.67026 10.0916 3.04004 8.54233 3.04004C6.99308 3.04004 5.53868 3.67026 4.44788 4.81461C3.35708 5.95896 2.75635 7.48476 2.75635 9.11006C2.75635 10.7354 3.35708 12.2612 4.44788 13.4055C5.53868 14.5499 6.99308 15.1801 8.54233 15.1801C9.82284 15.1801 11.0875 14.7323 12.0993 13.8865L14.3915 16.3244C14.5338 16.4737 14.7077 16.54 14.8974 16.54C15.0871 16.54 15.261 16.4571 15.4033 16.3244C15.6879 16.0425 15.6879 15.5615 15.4033 15.263ZM12.9055 9.11006C12.9055 10.3373 12.4471 11.4817 11.625 12.3441C10.803 13.2065 9.69637 13.6875 8.54233 13.6875C7.3883 13.6875 6.28169 13.2065 5.45963 12.3441C4.63758 11.4817 4.17913 10.3208 4.17913 9.11006C4.17913 7.88279 4.63758 6.73844 5.45963 5.87603C6.28169 5.01363 7.3883 4.53267 8.54233 4.53267C9.71217 4.53267 10.803 5.01363 11.625 5.87603C12.4471 6.73844 12.9055 7.88279 12.9055 9.11006Z" fill="black"/>
                    </svg>
                </span>
            </div>
            <div v-if="pagination.total" class="flex md:space-x-7 items-center justify-end">
                <span class="hidden md:inline">{{ pagination.currentPage*10-9 }}-{{pagination.currentPage == pagination.totalPage ? pagination.total : pagination.currentPage*pagination.docsOnPage }} sur {{ pagination.total }}</span>
                <span class="flex space-x-2">
                    <svgicon @click="pagination.currentPage != 1 ? gotoPage(pagination.currentPage-1) : ''" :color="pagination.currentPage != 1 ? 'black' : '#BAC7D5'" class="cursor-pointer" name="arrowPagePrev" width="24" height="24"></svgicon>
                    <svgicon @click="pagination.currentPage != pagination.totalPage ? gotoPage(pagination.currentPage+1) : ''" :color="pagination.currentPage == pagination.totalPage ? '#BAC7D5' : 'black'" class="cursor-pointer" name="arrowPageNext" width="24" height="24"></svgicon>
                </span>
            </div>
        </div>

        <div>
            <div class="p-4 bg-white hidden lg:block">
                <m-table
                :emptyDataMessage="'Aucune planification'"
                :css="{tableClass: 'bg-white'}"
                :columns="fields"
                apiMode
                :loadOnApiMode="loadPlanningsOnApiMode"
                dataPath="data"
                :perPage="10"
                rowClass="text-sm hover:bg-badgeActive btn-visible"
                :appendParams="appendParams"
                ref="table" >
                    <template v-slot:action="{rowData}">
                        <div class="flex justify-center">
                            <div class="flex space-x-2">
                                <MButton @click="restauredId = rowData._id; restaure = true" :classes="''">
                                    <span slot="icon">
                                        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22 11.8296c0 .2014-.075.4028-.225.5287l-2.95 2.9204c-.15.151-.325.2266-.525.2266s-.375-.0756-.525-.2266l-2.9-2.9204c-.275-.3021-.275-.7804 0-1.0574h2.3c-.2-2.7693-2.425-4.9344-5.175-4.9344-1.55 0-2.95.705-3.9 1.8127L6.225 6.7693C7.6 5.0826 9.675 4 12 4c4 0 7.275 3.2225 7.475 7.3009h2.3c.15.1259.225.3273.225.5287zm-19.775.2266H4.5c.2 4.0785 3.475 7.3009 7.5 7.3009 2.325 0 4.4-1.0825 5.775-2.7693L15.9 15.178c-.95 1.1077-2.35 1.8126-3.9 1.8126-2.75 0-4.975-2.1651-5.175-4.9344h2.3c.275-.3021.275-.7804 0-1.0574l-2.9-2.9203c-.15-.1511-.325-.2266-.525-.2266s-.375.0755-.525.2266l-2.95 2.9203c-.15.1511-.225.3273-.225.5287 0 .2014.075.4028.225.5287z" fill="#0965F6" />
                                        </svg>
                                    </span>
                                </MButton>
                            </div>
                        </div>
                    </template>
                </m-table>
            </div>
            <div class="px-4 bg-white lg:hidden">
                <m-table
                :emptyDataMessage="'Aucune planification'"
                :css="{tableClass: 'bg-white'}"
                :columns="mobileFields"
                apiMode
                :loadOnApiMode="loadPlanningsOnApiMode"
                dataPath="data"
                :perPage="10"
                rowClass="text-xs hover:bg-blueLighter-simple"
                :appendParams="appendParams"
                ref="mobileTable" >
                    <template v-slot:planningReference="{rowData}">
                         <div class="flex flex-col">
                            <span class="text-blueNormal">{{ rowData.reference }}</span>
                            <span class="font-bold">{{ dateFormat(rowData.createdAt) }}</span>
                        </div>
                    </template>
                    <template v-slot:chevron="{rowData}" class="">
                        <MButton @click="restauredId = rowData._id; restaure = true" :classes="''">
                            <span slot="icon">
                                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 11.8296c0 .2014-.075.4028-.225.5287l-2.95 2.9204c-.15.151-.325.2266-.525.2266s-.375-.0756-.525-.2266l-2.9-2.9204c-.275-.3021-.275-.7804 0-1.0574h2.3c-.2-2.7693-2.425-4.9344-5.175-4.9344-1.55 0-2.95.705-3.9 1.8127L6.225 6.7693C7.6 5.0826 9.675 4 12 4c4 0 7.275 3.2225 7.475 7.3009h2.3c.15.1259.225.3273.225.5287zm-19.775.2266H4.5c.2 4.0785 3.475 7.3009 7.5 7.3009 2.325 0 4.4-1.0825 5.775-2.7693L15.9 15.178c-.95 1.1077-2.35 1.8126-3.9 1.8126-2.75 0-4.975-2.1651-5.175-4.9344h2.3c.275-.3021.275-.7804 0-1.0574l-2.9-2.9203c-.15-.1511-.325-.2266-.525-.2266s-.375.0755-.525.2266l-2.95 2.9203c-.15.1511-.225.3273-.225.5287 0 .2014.075.4028.225.5287z" fill="#0965F6" />
                                </svg>
                            </span>
                        </MButton>
                    </template>
                </m-table>
            </div>
        </div>
        <Modal ref="modal" centered size="md" :css="deliveryCss" :show="restaure">
            <div slot="modal-header">
                
            </div>
            <div class="" slot="modal-body">
                <p class="text-lg md:text-xl">Êtes-vous sur de vouloir restaurer cette planification ?</p>
                <div class="flex space-x-3 w-full mt-2">
                    <MButton @click="restaurePlanning(restauredId)" :classes="'border border-black bg-black text-white py-2 px-4 rounded-lg text-sm'" load :activateLoad="request" :text="'Oui'"></MButton>                    
                    <MButton @click="restaure = false" :classes="'border border-black text-black py-2 px-4 rounded-lg text-sm'" :text="'Non'"></MButton>                    
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import {DateTime} from 'luxon'
import axios from 'axios'
import Planning from '../../store/models/planning'
import User from '../../store/models/user'
export default {
    components: {
    },
    data() {
        return {
            request: false,
            restaure: false,
            restauredId: '',
            deliveryCss: {modalClass:"py-5 md:py-8 px-3 md:px-8 overflow-x-hidden overflow-y-auto hiddScroll"},
            pagination: {
                currentPage: null,
                perPage: null,
                docsOnPage: null,
                total: null,
                totalPage: null
            },
            searchText: '',
            appendParams: {status: 'archived'},
            mobileFields: [
                {
                    name: "__slot:planningReference",
                    title: '',
                    titleClass: '',
                    width: '50%',
                    dataClass: "py-2.5 break-words",
                },
                {
                    name: 'status',
                    title: '',
                    width: '40%',
                    titleClass: 'text-center text-inkNormal-simple',
                    dataClass: '',
                    transform(){
                        return '<p class="bg-red-500 text-white text-8 font-bold sm:text-11 md:text-13 rounded-full py-0.5 px-4 sm:px-6 text-center">Archivé</p>'
                    }
                },
                {
                    name: '__slot:chevron',
                    title: '',
                    titleClass: '',
                    width: '10%',
                    dataClass: 'text-center'
                },
            ],
            fields: [
                {
                    name: 'reference',
                    title: 'Réference',
                    titleClass: 'py-3 text-left text-inkNormal-simple',
                    dataClass: 'py-3.5 text-blueNormal'
                },
                {
                    name: 'createdAt',
                    title: 'Date de planification',
                    titleClass: 'text-left text-inkNormal-simple',
                    dataClass: 'py-3.5',
                    transform({createdAt}){
                        if (!createdAt) {
                            return ''
                        }
                        const dt = DateTime.fromISO(createdAt)
                        return dt.toLocaleString(DateTime.DATETIME_SHORT)
                    }
                },
                {
                    name: 'networkInfos',
                    title: 'Architecture',
                    titleClass: 'text-left text-inkNormal-simple',
                    dataClass: '',
                    transform(planning){
                        if(planning.networkInfos.architecture == "waterfall") return "En Cascade"
                        return "Centralisée"
                    }
                },
                {
                    name: 'status',
                    title: 'Statut',
                    titleClass: 'text-center text-inkNormal-simple',
                    dataClass: '',
                    transform(){
                        return '<p class="bg-kkiapayRed text-white text-8 font-bold sm:text-11 md:text-13 rounded-full py-0.5 px-4 sm:px-6 text-center">Archivé</p>'
                    }
                },
                {
                    name: '__slot:action',
                    title: 'Restaurer',
                    titleClass: 'text-center text-inkNormal-simple',
                    dataClass: 'btn ',
                }
            ],
        }
    },

    computed:{
        user(){
            return User.query().first()
        }
    },

    methods: {
        restaurePlanning(id){
            this.request = true
            axios.post('/planning/status', {
                planningId: id,
                status: 'success'
            })
            .then(res => {
                this.request = false
                Planning.insert({ data: res.data })
                this.refreshTables()
                this.restaure = false
            })
            .catch(err => {
                this.request = false
                console.log(err);
            })
        },
        dateFormat(dateToConvert) {
            let dt = DateTime.fromISO(dateToConvert)
            return dt.setLocale('fr').toLocaleString(DateTime.DATETIME_SHORT)
        },
        
        gotoPage(page){
            this.appendParams.page = page
            this.refreshTables()
        },
        onSearch(){
            this.appendParams.search = this.searchText;
            this.refreshTables()
        },
        loadPlanningsOnApiMode({options}){
            const params = options['params']
            console.log('params -->', params);
            
            return new Promise((resolve, reject) => {
                axios.get(`/planning/${this.user._id}`,{
                    params
                })
                .then((response) => {
                    console.log('orders ', response);
                    this.pagination = response.data.pagination
                    const plannings = response.data.data
                    plannings.forEach(planning => {
                        Planning.insert({ data: planning })
                    });
                    resolve({data: response.data})
                })
                .catch(error => {
                    console.log('getAll ', error);
                    reject(error.statusText)
                })
            })
        },

        refreshTables(){
        //@ts-ignore
        this.$refs.table.refresh();
        //@ts-ignore
        this.$refs.mobileTable.refresh()
        },
    },
}
</script>

<style scoped>
.btn{
    display: none;
}
.btn-visible:hover .btn{
    display: flex;
}
</style>