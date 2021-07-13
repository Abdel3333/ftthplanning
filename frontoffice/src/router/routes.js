import Home from '@/components/layouts/Home/Home.vue'
import Landing from '@/pages/Landing.vue'
import About from '@/pages/About.vue'
import PlanningsIndex from '@/components/planningsComponents/PlanningsIndex'
import PlanningView from '@/components/planningsComponents/PlanningView'
import DPlanningsArchived from '@/pages/dashboard/DPlanningsArchived'
import DTutorial from '@/pages/dashboard/DTutorial'
import DHome from '@/pages/dashboard/DHome.vue'
import Dashboard from '@/components/layouts/Dashboard/Dashboard.vue'
import DPlanningRecap from '@/pages/dashboard/DPlanningRecap.vue'
import DPlanIndex from '@/pages/dashboard/DPlanIndex.vue'
import DSemiPlan from '@/pages/dashboard/DSemiPlan.vue'
import DMap from '@/pages/dashboard/DMap.vue'
import authGuard from './authGuard'



export const routes = [{
        path: '/',
        name: 'home',
        component: Home,
        children: [{
                path: '',
                component: Landing,
            },
            {
                path: 'about',
                component: About,
            },
        ]
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        beforeEnter(to, from, next) {
            authGuard(next)
        },
        children: [{
                path: 'home',
                component: DHome,
            },
            {
                path: 'planning',
                component: DPlanIndex,
            },
            {
                path: 'planning/semi_assist',
                component: DSemiPlan,
            },
            {
                path: 'planning/map',
                component: DMap,
            },
            {
                path: 'planningsRecap',
                component: DPlanningRecap,
                children: [{
                        path: '',
                        component: PlanningsIndex,
                    },
                    {
                        path: ':planningId',
                        component: PlanningView,
                    },
                ]
            },
            {
                path: 'plannings/archived',
                component: DPlanningsArchived,
            },
            {
                path: 'tutorial',
                component: DTutorial,
            }
        ]
    },
    {
        path: '*',
        redirect: '/'
    },
    {
        path: '/dashboard',
        redirect: '/dashboard/home'
    },
    {
        path: '/',
        redirect: '/home'
    },

]