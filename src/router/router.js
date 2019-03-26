import VueRouter from 'vue-router'
import ETHEREUM from "../components/ETHEREUM"
import NEO from "../components/NEO"
import BITCOIN from "../components/BITCOIN"
import Home from "../components/Home"



const routes = [
    {path: '/eth', component: ETHEREUM},
    {path:'/neo',component: NEO},
    {path:'/btc',component:BITCOIN},
    {path:'/',component: Home},



]
export default new VueRouter({routes})
