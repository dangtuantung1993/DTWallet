<template>
    <div class="container-fluid" id="BITCOIN">
        <div class="logo">
            <img src="../assets/img/bitcoin.svg">
        </div>
        <div class="row">
            <div class="col-lg-12" >
                <div class="col-lg-12 select-cus" v-if="listname.length" >
                    <label class="typo__label"
                    >Select with search</label>
                    <multiselect v-model="name"
                                 :options="listname"
                                 :custom-label="nameWithLang"
                                 placeholder="Select one"
                                 label="wal"
                                 track-by="wal"
                                 @select="onSelect"
                    ></multiselect>
                </div>
                <div class="col-lg-12"
                     v-if="listname.length">
                    <code >
                        <div class="table" >
                            <table class="table-hover" >
                                <thead >
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Symbol</th>
                                    <th scope="col">Balance</th>
                                </tr>
                                </thead>

                                <tbody >
                                <tr v-for="(NEP, index) in balances"
                                    :key="index">
                                    <th scope="col">{{index}}</th>
                                    <td >
                                        {{NEP.asset}}
                                    </td>
                                    <td> {{ NEP.asset_symbol}}</td>

                                    <td>{{NEP.amount}} {{ NEP.asset_symbol}}</td>
                                </tr>
                                </tbody>

                            </table>
                        </div>
                    </code>
                </div>


            </div>
        </div>
        <div class="form-group" style="text-align: center">
            <p v-if="!listname.length">
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
        <button v-if="!listname.length"
                type="button"
                class="btn btn-success text-uppercase"
                @click="send"
                v-on:click="isshow = false">send
        </button>



    </div>
</template>

<script>
    import {listbtc} from '../APIs/blockchainAPI';
    import {Multiselect} from 'vue-multiselect'

    export default {
        name: "BITCOIN",
        components:{
            Multiselect
        },

        props: {},
        data: function () {
            return {
                isshow2:false,
                isshow: true,
                wallets_input: '',
                btcs: null,
                balances: {},
                list_wallets: [],
                name:{ wal: 'Wallet'},
                listname:[],
                error:[],

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
                    this.listname.push({wal: list_wallets[i]})
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
                let btc = await listbtc(your_wallet)
                this.btcs = btc



            },
            navigateToLogin(){
                this.$router.push("Login")
            },
            signOut(){
                this.$session.destroy()
                this.$router.push('/')
            },
            nameWithLang ({wal}) {
                return `${wal}`
            },

            onSelect (option) {
                this.getDataFromAPI(option.wal);
            },
        },
    }

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">


</style>

<style scoped>
    .logo {
        width: 70%;
        padding:20px 25px;
        text-align: center;
        display: block;
        margin: 0 auto;
    }
    .table-hover{
        font-family: 'Arial';
        font-size: 14px;
    }
    .table-hover{
        color: black;
        text-align: center;
        width: 100%;
    }
    .table-hover thead tr,.table-hover thead:hover tr{
        background-image:linear-gradient(to right, #0d76d0 , #04235d)!important;
    }
    .table-hover thead th{
        color:#fff;
        text-align: center;
        border-right:1px solid #ccc;
    }
    .table-hover th{
        text-align: center;
    }
    .table-hover td,.table-hover th{
        border-right:1px solid #ccc;
    }
    .table-hover tr:nth-child(even){
        background: #dcdbff;
    }
    .table-hover  tr:hover{
        background: #a6b6f3!important;
    }
    tr {
        width: max-content;
    }

    .container-fluid {
        text-align: center;
    }
    .btn-success {
        width: 50%;
    }
    .multiselect{
        width: 600px;
        transform: translateX(-50%);
        left: 50%;
    }
    .select-cus{
        margin-top: 15px;
    }
</style>