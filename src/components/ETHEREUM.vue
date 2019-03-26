<template>
    <div class="container-fluid" id="ether">
        <div class="logo">
            <img src="../assets/img/eth.svg">
        </div>
       <div class="row">
            <div class="col-lg-12" >
                <ul class="boxwallet">
                    <li v-for="(wallet,index) in wallets"
                        :key="index">
                        <div class="address" v-if="wallet.tokens" >
                            <label>{{wallet.ethers.address}}</label>
                            <div>
                                <label>Balance ETH:</label>
                                <span>{{wallet.ethers.ETH.balance}}</span>
                            </div>
                            <div>{{wallet.tokens.length}}</div>
                            <b-button v-b-modal="modalId(index)">Xem Chi Tiết</b-button>
                            <b-modal :id="'modal' + index" title="Balance" ok-only>
                                <div class="scroll-table">
                                    <table class="table-balance">
                                        <tbody>
                                        <tr v-for="(token,index) in wallet.tokens" :key="index">
                                            <td class="td-long">
                                                {{token.tokenInfo.name}}
                                            </td>
                                            <td class="td-short">
                                               <div>
                                                   <span>{{(token.balance/(Math.pow(10, parseInt(token.tokenInfo.decimals)))).toFixed(2)}}</span>
                                                   <span>{{token.tokenInfo.symbol}}</span>
                                               </div>
                                                <div v-if="token.tokenInfo.price.diff">
                                                    <span class="color-3">${{(((token.balance/(Math.pow(10, parseInt(token.tokenInfo.decimals)))).toFixed(2))*(token.tokenInfo.price.rate)).toFixed(2)}}</span>
                                                    <span class="color-4">({{token.tokenInfo.price.diff}}%)</span>
                                                </div>
                                            </td>

                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </b-modal>
                        </div>

                    </li>
                </ul>
                <!-- Modal -->
            </div>
        </div>
        <div class="form-group" style="text-align: center">
            <p v-if="!wallets.length">
                <textarea class="form-control"
                          style="margin:50px auto;width:50%;"
                          rows="5"
                          v-model="wallets_input"
                          name="your_list_wallets"
                          placeholder="Nhap dia chi vi" autofocus
                          v-validate="'required'"
                          :class="{'form-control': true,
                                     'border-danger': errors.has('your_list_wallets')}">
                </textarea>
                <span v-show="errors.has('your_list_wallets')" class="text-danger">
                                                    {{ errors.first('your_list_wallets') }}
                </span>
            </p>
        </div>
        <button v-if="!wallets.length"
                type="button"
                class="btn btn-success text-uppercase"
                @click="send"
                v-on:click="isshow = false">send
        </button>



    </div>
</template>

<script>
    import {listeth} from '../APIs/ethplorerAPI';


    export default {
        name: "ETHEREUM",
        components:{

        },

        props: {},
        data: function () {
            return {
                isshow2:false,
                isshow: true,
                wallets_input: '',
                ethers: null,
                tokens: {},
                wallets: [],
                list_wallets: [],
                listname:[],
                error:[]
            }

        },

        methods: {
            wait: function(ms) {
                return new Promise(r => setTimeout(r, ms))
            },
            async send() {
                this.checkForm()
                if (this.errors.length > 0){
                    return
                }
                let result = await this.$validator.validateAll()
                if (!result) {
                    return
                }
                let list_wallets = await this.wallets_input.split('\n')
                for(var i = 0; i < list_wallets.length;i++){
                    await this.getDataFromAPI(`${list_wallets[i]}`)
                    await this.wait(5000)
                }


            },
            checkForm() {
                this.error = []
                if (!this.wallets_input) {
                    this.error.push("Ban can nhap danh sach dia chi vi")
                }
            },
            getDataFromAPI: async function (your_wallet) {
                let eth = await listeth(your_wallet)
                this.ethers = eth
                this.tokens = eth.tokens
                this.wallets.push({ ethers: eth, tokens: eth.tokens})

            },
            modalId(index) {
                return 'modal' + index;
            }

        },
    }

</script>

<style scoped>
    .logo {
        width: 70%;
        padding:20px 25px;
        text-align: center;
        display: block;
        margin: 0 auto;
    }
    .container-fluid{
        height: 100%;
        text-align: center;
    }
    .boxwallet{
        padding-left: 0px;
    }
    .boxwallet li{
        display: inline-block;
        width: calc(100% / 3);
        padding:0px 25px;
        text-align: center;
        margin-bottom: 15px;


    }
    .boxwallet li .address{
        background: rgba(255,255,255,0.7);
        padding: 15px ;
        border-radius: 8px;
        word-break: break-all;
        margin-bottom: 15px;
    }
    .boxwallet li .address span{
        font-weight: bold;
        color:red;
    }
    .btn-success {
        width: 50%;
    }
    .table-balance{
        width:100%;

    }
    .table-balance tr:hover{
        background: #797979!important;
    }
.table-balance tr:nth-child(odd){
background: #1f1d1d;
}
    .table-balance tr:nth-child(even){
        background: #57575a;
    }
    .table-balance tr td{
        padding:6px 10px;
        color:#fff;
    }
    .table-balance tr td span{
       font-weight: normal!important;
        color: #fff!important;
        padding-left: 5px;
    }
    .table-balance tr td.td-long{
        min-width: 200px;
        text-align: left;
    }
    .table-balance tr td.td-short{
        max-width: 250px;
        text-align: right;
    }
    .table-balance tr td .color-4{
        color: #14e614  !important;
    }
    .table-balance tr td .color-3{
        color: #b9aeae !important;
    }
    .scroll-table{
        height:360px;
        overflow-y: auto;
    }
</style>