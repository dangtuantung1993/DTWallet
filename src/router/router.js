import VueRouter from 'vue-router'
import ETHEREUM from "../components/ETHEREUM"
import NEO from "../components/NEO"
import BITCOIN from "../components/BITCOIN"


const routes = [
    {path: '/eth', component: ETHEREUM},
    {path:'/neo',component: NEO},
    {path:'/btc',component:BITCOIN}

]
export default new VueRouter({routes})
