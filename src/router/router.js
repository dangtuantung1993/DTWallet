import VueRouter from 'vue-router'
import Ether from "../components/Ether"

const routes = [
    {path: '/', component: Ether},

]
export default new VueRouter({routes})
