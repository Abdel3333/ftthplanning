<template>
    <div class="px-5 lg:px-6 pb-5 lg:pb-4 pt-4 lg:pt-7">
        <div class="flex items-center space-x-3">
            <svgicon name="user" width="42" height="42"></svgicon>
            <div class="flex flex-col">
                <div class="text-inkDark text-15">
                    <span>{{ user.firstName + ' '+ user.lastName }}</span>
                </div>
                <!-- <div class="text-inkNormal-simple text-11 mb-2">
                    <span v-if="user.office">{{ user.firstName + ' '+ user.lastName }}</span>
                    <span v-else>Compte personnel</span>
                </div>
                <div class="text-9 px-3.5 py-0.5 rounded-full text-center w-144" :class="user.accountStatus != 'active' ? 'bg-yellowLighter-active' : 'bg-badgeActive' ">
                    <span v-if="user.accountStatus != 'active'">En attente d’activation</span>
                    <span v-else>Compte actif</span>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import User from '../../../../store/models/user'
export default {
    components: {
    },
    data() {
        return {
        }
    },
    computed: {
        user() {
            return User.query().first()
        }
    },
}
</script>

<style scoped>
</style>