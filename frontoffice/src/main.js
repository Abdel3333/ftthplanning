import Vue from 'vue'
import App from './App.vue'
import "tailwindcss/tailwind.css"
import VCalendar from 'v-calendar';
import VueRouter from 'vue-router'
import { routes } from './router/routes'
import SvgIcon from 'vue-svgicon'
import Modal from '@/components/modal/Modal'
import MInput from '@/components/globalComponents/MInput'
import MSelect from '@/components/globalComponents/MSelect'
import MFileInput from '@/components/globalComponents/MFileInput'
import MRadio from '@/components/globalComponents/MRadio'
import MButton from '@/components/globalComponents/MButton'
import MTable from '@/components/globalComponents/MTable'
import LoaderCss from '@/components/LoaderCss'
import { store } from './store/store'
import axios from 'axios';
import './registerServiceWorker'
import {
    LMap,
    LTileLayer,
    LMarker,
    LPolyline,
    LControlLayers,
    LControl,
    LTooltip,
    LPopup,
    LRectangle,
    LPolygon,
    LControlZoom,
    LIcon,
    LLayerGroup,
    LControlAttribution,
    LControlScale,

} from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import Vuetable from "vuetable-2";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
Vue.component('vuetable', Vuetable);
Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-polyline', LPolyline);
Vue.component('l-control-layers', LControlLayers);
Vue.component('l-control', LControl);
Vue.component('l-tooltip', LTooltip);
Vue.component('l-popup', LPopup);
Vue.component('l-rectangle', LRectangle);
Vue.component('l-polygone', LPolygon);
Vue.component('l-control-zoom', LControlZoom);
Vue.component('l-icon', LIcon);
Vue.component('l-layer-group', LLayerGroup);
Vue.component('l-control-attribution', LControlAttribution);
Vue.component('l-control-scale', LControlScale);
Vue.component("Modal", Modal);
Vue.component("MInput", MInput);
Vue.component("MSelect", MSelect);
Vue.component("MFileInput", MFileInput);
Vue.component("MRadio", MRadio);
Vue.component("MButton", MButton);
Vue.component("LoaderCss", LoaderCss);
Vue.component("MTable", MTable);
import { ValidationProvider, ValidationObserver } from 'vee-validate';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
import { extend } from 'vee-validate';
import { required, email, min, max, max_value, min_value, numeric, confirmed, mimes } from 'vee-validate/dist/rules';

extend('email', {
    ...email,
    message: 'L\'adresse e-mail est invalide'
});
extend('confirmed', {
    ...confirmed,
    message: '{_field_} n\'est pas conforme'
});
extend('numeric', {
    ...numeric,
    message: '{_field_} doit contenir que des chiffres'
});
extend('mimes', {
    ...mimes,
    message: '{_field_} doit contenir que des images'
});
extend('min', {
    ...min,
    message: '{_field_} est invalide'
});
extend('max_value', {
    ...max_value,
    message: '{_field_} est invalide'
});
extend('min_value', {
    ...min_value,
    message: '{_field_} est invalide'
});
extend('max', {
    ...max,
    message: '{_field_} est invalide'
});
extend('required', {
    ...required,
    message: '{_field_} est requis(e)'
});
extend('upCase', { validate: value => value.match(/[A-Z]+/g) !== null, message: '{_field_} doit contenir au moins une majuscule' });
extend('oneNumber', { validate: value => value.match(/[0-9]+/g) !== null, message: '{_field_} doit contenir au moins un chiffre' });
extend('oneCharac', { validate: value => value.match(/^(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])/g) !== null, message: '{_field_} doit contenir au moins un caractère spécial' });

axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL

Vue.use(VCalendar, {
    componentPrefix: 'vc',
});

Vue.use(SvgIcon, {
    tagName: 'svgicon',
    isOriginalDefault: true
})


Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
    routes,
    mode: 'hash'
});

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')