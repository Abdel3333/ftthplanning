<template>
    <div class="lg:px-12 px-6 pb-16 lg:py-9 py-6 h-full">
        <div>
            <p class="text-sm md:text-lg font-bold mb-2.5 md:mb-6">Mes projets planifiés</p>
            <div class="mb-4 md:mb-7 flex space-x-1 text-10 md:text-base text-inkNormal-simple border-b-2 border-gray6">
                <div @click="endedStatus = true" :class="['rounded-t px-2.5 md:px-4 py-1.5 md:py-2 -mb-0.5 border-2 border-b-0 border-gray6 cursor-pointer', endedStatus ? 'bg-green2 text-blueDark': 'bg-saltGrey']">Terminés</div>
                <div @click="endedStatus = false" :class="['rounded-t px-2.5 md:px-4 py-1.5 md:py-2 -mb-0.5 border-2 border-b-0 border-gray6 cursor-pointer', !endedStatus ? 'bg-yellowLighter-simple text-blueDark': 'bg-saltGrey']">En cours</div>
            </div>
            <div class="hidden md:block">
                <vuetable ref="vuetable"
                :api-mode="false"
                :fields="fields"
                :css="table"
                :headerClass="'border'"
                :rowClass="'hover:bg-badgeActive btn-visible'"
                :data="data"
                >
                    <div slot="checkboxe" class="">
                        <input class="mx-1 form-checkbox text-black focus:outline-none rounded-sm" type="checkbox" name="" id="">
                    </div>
                    <div slot="action" class="btn" slot-scope="{rowData}" >
                       <div class="flex space-x-2">
                            <MButton @click="goToPlanningDetails(rowData.reference)">
                                <span slot="icon">
                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0)">
                                        <path d="M12.1992 15C13.8561 15 15.1992 13.6569 15.1992 12C15.1992 10.3431 13.8561 9 12.1992 9C10.5424 9 9.19922 10.3431 9.19922 12C9.19922 13.6569 10.5424 15 12.1992 15Z" fill="#27AE60"/>
                                        <path d="M23.2073 11.1844C21.967 9.26625 20.3578 7.63688 18.554 6.47203C16.5586 5.18203 14.3554 4.5 12.1832 4.5C10.1901 4.5 8.23027 5.06953 6.35808 6.19266C4.44886 7.33781 2.71918 9.01078 1.21683 11.1647C1.04723 11.4081 0.953827 11.6965 0.948485 11.9931C0.943143 12.2897 1.02611 12.5813 1.18683 12.8306C2.4248 14.768 4.01808 16.3997 5.79371 17.5486C7.79293 18.8438 9.94449 19.5 12.1832 19.5C14.3728 19.5 16.5806 18.8236 18.5676 17.5444C20.3704 16.3833 21.9764 14.7478 23.212 12.8137C23.3672 12.5702 23.4492 12.2872 23.4484 11.9984C23.4476 11.7096 23.3639 11.4271 23.2073 11.1844ZM12.1992 16.5C11.3092 16.5 10.4391 16.2361 9.69911 15.7416C8.95909 15.2471 8.38231 14.5443 8.04172 13.7221C7.70112 12.8998 7.61201 11.995 7.78564 11.1221C7.95928 10.2492 8.38786 9.44736 9.0172 8.81802C9.64653 8.18868 10.4484 7.7601 11.3213 7.58647C12.1942 7.41283 13.099 7.50195 13.9213 7.84254C14.7435 8.18314 15.4463 8.75991 15.9408 9.49993C16.4353 10.24 16.6992 11.11 16.6992 12C16.6978 13.1931 16.2233 14.3369 15.3797 15.1805C14.536 16.0241 13.3922 16.4986 12.1992 16.5Z" fill="#27AE60"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0">
                                        <rect width="24" height="24" fill="white" transform="translate(0.199219)"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                </span>
                            </MButton>
                            <MButton>
                                <span slot="icon">
                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.3255 12.2165C19.8919 12.2165 19.5414 12.5633 19.5414 12.9922V19.4079C19.5414 19.9874 19.0571 20.4483 18.4759 20.4483H4.84205C4.25629 20.4483 3.76739 19.9874 3.76739 19.4079V5.54982C3.76739 4.97031 4.25629 4.52313 4.84205 4.52313H10.1277C10.5613 4.52313 10.9118 4.17633 10.9118 3.7474C10.9118 3.31847 10.5613 2.97168 10.1277 2.97168H4.84205C3.3938 2.97168 2.19922 4.11701 2.19922 5.54982V19.4079C2.19922 20.8407 3.3938 21.9997 4.84205 21.9997H18.4759C19.9242 21.9997 21.1095 20.8453 21.1095 19.4079V12.9922C21.1095 12.5678 20.759 12.2165 20.3255 12.2165Z" fill="#0965F6"/>
                                        <path d="M20.2886 2.64339C19.8781 2.23272 19.3339 2.00456 18.7527 2C18.1716 2 17.6227 2.21903 17.2122 2.62971L10.1647 9.6021C9.90178 9.86219 9.71268 10.1862 9.61121 10.5375L8.38434 14.836C8.30593 15.1097 8.38434 15.4018 8.5919 15.6026C8.73949 15.744 8.93782 15.8216 9.14076 15.8216C9.21916 15.8216 9.29757 15.8125 9.37137 15.7851L13.5962 14.4983C13.9329 14.3979 14.2419 14.2108 14.491 13.9644L21.5662 6.96464C22.4057 6.13415 22.4103 4.78348 21.5801 3.94387L20.2886 2.64339ZM16.7833 5.24892L18.9142 7.40269L18.393 7.91832L16.2621 5.76454L16.7833 5.24892ZM13.3794 12.8738C13.3103 12.9423 13.2272 12.9925 13.1304 13.0198L10.28 13.8868L11.1148 10.9573C11.1425 10.8615 11.1978 10.7702 11.267 10.6972L15.1459 6.85968L17.2768 9.01346L13.3794 12.8738ZM20.4593 5.8695L20.0211 6.30299L17.8902 4.14921L18.3146 3.73397C18.4299 3.61989 18.5775 3.56514 18.7389 3.56514C18.7389 3.56514 18.7389 3.56514 18.7435 3.56514C18.9049 3.56514 19.0571 3.62446 19.1678 3.73854L20.4593 5.03901C20.6899 5.26717 20.6899 5.64134 20.4593 5.8695Z" fill="#0965F6"/>
                                    </svg>
                                </span>
                            </MButton>
                            <MButton :classes="''">
                                <span slot="icon">
                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.166 4.5H16.666V3.375C16.666 2.87772 16.4685 2.40081 16.1168 2.04917C15.7652 1.69754 15.2883 1.5 14.791 1.5H11.041C10.5437 1.5 10.0668 1.69754 9.71519 2.04917C9.36356 2.40081 9.16602 2.87772 9.16602 3.375V4.5H4.66602C4.4671 4.5 4.27634 4.57902 4.13569 4.71967C3.99503 4.86032 3.91602 5.05109 3.91602 5.25C3.91602 5.44891 3.99503 5.63968 4.13569 5.78033C4.27634 5.92098 4.4671 6 4.66602 6H5.46289L6.35352 20.2931C6.42008 21.5517 7.38477 22.5 8.60352 22.5H17.2285C18.4534 22.5 19.3988 21.5728 19.4785 20.2969L20.3691 6H21.166C21.3649 6 21.5557 5.92098 21.6963 5.78033C21.837 5.63968 21.916 5.44891 21.916 5.25C21.916 5.05109 21.837 4.86032 21.6963 4.71967C21.5557 4.57902 21.3649 4.5 21.166 4.5ZM9.94273 19.5H9.91602C9.72165 19.5001 9.53482 19.4248 9.39491 19.2899C9.255 19.1549 9.17294 18.971 9.16602 18.7767L8.79102 8.27672C8.78393 8.07781 8.85615 7.88423 8.99179 7.73856C9.12743 7.5929 9.31538 7.50709 9.5143 7.5C9.71321 7.49291 9.90679 7.56514 10.0525 7.70078C10.1981 7.83642 10.2839 8.02437 10.291 8.22328L10.666 18.7233C10.6696 18.8218 10.6537 18.92 10.6193 19.0124C10.5849 19.1048 10.5326 19.1894 10.4654 19.2616C10.3982 19.3337 10.3175 19.3919 10.2278 19.4328C10.1381 19.4737 10.0412 19.4966 9.94273 19.5ZM13.666 18.75C13.666 18.9489 13.587 19.1397 13.4463 19.2803C13.3057 19.421 13.1149 19.5 12.916 19.5C12.7171 19.5 12.5263 19.421 12.3857 19.2803C12.245 19.1397 12.166 18.9489 12.166 18.75V8.25C12.166 8.05109 12.245 7.86032 12.3857 7.71967C12.5263 7.57902 12.7171 7.5 12.916 7.5C13.1149 7.5 13.3057 7.57902 13.4463 7.71967C13.587 7.86032 13.666 8.05109 13.666 8.25V18.75ZM15.166 4.5H10.666V3.375C10.6655 3.3256 10.6748 3.27658 10.6934 3.23083C10.7121 3.18507 10.7397 3.14351 10.7746 3.10858C10.8095 3.07364 10.8511 3.04604 10.8968 3.02739C10.9426 3.00875 10.9916 2.99943 11.041 3H14.791C14.8404 2.99943 14.8894 3.00875 14.9352 3.02739C14.9809 3.04604 15.0225 3.07364 15.0574 3.10858C15.0924 3.14351 15.12 3.18507 15.1386 3.23083C15.1573 3.27658 15.1666 3.3256 15.166 3.375V4.5ZM16.666 18.7767C16.6591 18.971 16.577 19.1549 16.4371 19.2899C16.2972 19.4248 16.1104 19.5001 15.916 19.5H15.8888C15.7904 19.4965 15.6935 19.4736 15.6039 19.4327C15.5143 19.3917 15.4336 19.3335 15.3665 19.2614C15.2994 19.1893 15.2471 19.1046 15.2127 19.0123C15.1783 18.92 15.1624 18.8217 15.166 18.7233L15.541 8.22328C15.5445 8.12479 15.5674 8.02795 15.6083 7.9383C15.6493 7.84865 15.7075 7.76794 15.7796 7.70078C15.8517 7.63361 15.9364 7.58132 16.0287 7.54687C16.121 7.51242 16.2192 7.49649 16.3177 7.5C16.4162 7.50351 16.5131 7.52638 16.6027 7.56732C16.6924 7.60825 16.7731 7.66644 16.8402 7.73856C16.9074 7.81069 16.9597 7.89534 16.9942 7.98767C17.0286 8.08001 17.0445 8.17823 17.041 8.27672L16.666 18.7767Z" fill="#F11C33"/>
                                    </svg>
                                </span>
                            </MButton>
                       </div>
                    </div>
                </vuetable>
            </div>
            <div class="md:hidden">
                <vuetable ref="vuetable"
                :api-mode="false"
                :fields="mobileFields"
                :css="mobileTable"
                :rowClass="''"
                :data="data"
                >
                    <div slot="checkboxe" class="">
                        <input class="mx-2 h-3.5 w-3.5 form-checkbox text-black focus:outline-none rounded-sm" type="checkbox" name="" id="">
                    </div>
                    <div class="flex flex-col" slot="productReference" slot-scope="{rowData}">
                        <span class="font-bold">{{ rowData.product }}</span>
                        <span class="text-blueNormal">{{ rowData.reference }}</span>
                    </div>
                    <div class="flex flex-col" slot="amountDate" slot-scope="{rowData}">
                        <span >{{ rowData.amount }} FCFA</span>
                        <span >{{ rowData.date }}</span>
                    </div>
                    <div slot="chevron" class="">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.42969 5.92969L14.5 12L8.42969 18.0703L6.92969 16.5703L11.5 12L6.92969 7.42969L8.42969 5.92969Z" fill="black"/>
                        </svg>
                    </div>
                </vuetable>
            </div>
        </div>
    </div>
</template>

<script>
import Vuetable from "vuetable-2";
import Planning from '../../store/models/planning';

export default {
    components: {
        Vuetable,
    },
    data() {
        return {
            endedStatus: true,
            fields: [
                {
                    name: 'checkboxe',
                    title: '<input class="mx-1 form-checkbox text-black focus:outline-none rounded-sm" type="checkbox" name="" id="">',
                    titleClass: 'text-center',
                    dataClass: 'text-center'
                },
                {
                    name: 'reference',
                    title: 'REFERENCE',
                    titleClass: 'py-3 text-left',
                    dataClass: 'py-3.5 text-blueNormal'
                },
                {
                    name: 'date',
                    title: 'DATE DE PLANIFICATION',
                    titleClass: 'text-left',
                    dataClass: ''
                },
                {
                    name: 'architecture',
                    title: 'ARCHITECTURE',
                    titleClass: 'text-left',
                    dataClass: '',
                },
                {
                    name: 'statut',
                    title: 'STATUT',
                    titleClass: 'text-left',
                    dataClass: ''
                },
                {
                    name: 'action',
                    title: '',
                    titleClass: 'w-1/12'
                }
            ],
            mobileFields: [
                
                {
                    name: 'checkboxe',
                    title: '',
                    dataClass: 'text-center'
                },
                {
                    name: "productReference",
                    title: '',
                    dataClass: "py-2.5",
                },
                {
                    name: 'amountDate',
                    title: '',
                    dataClass: ''
                },
                {
                    name: 'chevron',
                    title: '',
                    dataClass: 'text-center'
                },
            ],
            table: {
                tableWrapper: 'p-4 bg-white',
                tableHeaderClass: 'fixed',
                tableBodyClass: 'text-inkNormal-simple text-sm',
                tableClass: 'table-auto w-full',
                loadingClass: 'loading',
            },
            mobileTable: {
                tableWrapper: 'bg-white',
                tableBodyClass: 'text-inkNormal-simple text-xs',
                tableClass: 'table-auto w-full',
                loadingClass: 'loading',
            },
            //data: []
        }
    },
    computed: {
        data(){
            let data = []
            const plannings =  Planning.all()
            plannings.forEach(planning => {
                data.push({
                    reference: planning._id,
                    date: '16/12/2021 - 16:50',
                    architecture: planning.networkInfos.architecture == "waterfall" ? "En Cascade":"Centralisée",
                    statut: planning.status == "success" ? "<span class='p-1.5 px-2.5 bg-green2 text-white rounded-full font-medium'>Terminé</span>":"<span class='p-1.5 px-2.5 bg-yellowLighter-simple text-black rounded-full font-medium'>En cours</span>",
                })
            });
           
            return data
        }
    },
    methods: {
        goToPlanningDetails(id){
            this.$router.push(`/dashboard/planningsRecap/${id}`)
        }
    },
}
</script>

<style scoped>
.btn{
    display: none;
}
.btn-visible:hover .btn{
    display: block;
}
</style>