<template>
    <div class="container-fluid">
        <ul class="list-box">
            <li>
                <div @click="ethereum">
                    <img src="../assets/img/eth.svg">
                </div>
            </li>
            <li>
                <div @click="neo">
                    <img src="../assets/img/neo.svg">
                </div>
            </li>
            <li>
                <div @click="bitcoin">
                    <img src="../assets/img/bitcoin.svg">
                </div>
            </li>
            <li>
                <div>
                    <img src="../assets/img/cybermile.svg">
                </div>
            </li>
            <li>
                <div>
                    <img src="../assets/img/eos.svg">
                </div>
            </li>
            <li>
                <div>
                    <img src="../assets/img/tron.svg">
                </div>
            </li>

        </ul>

    </div>
</template>

<script>
    export default {
        name: "Home",
        methods:{
            ethereum(){
                this.$router.push('/eth')
            },
            neo(){
                this.$router.push('/neo')
            },
            bitcoin(){
                this.$router.push('/btc')
            }
        }
    }

</script>

<style scoped>
    .list-box{
        list-style-type: none;
        padding-left: 0px;

    }
    .list-box li{
        display: inline-block;
        width: calc(100% / 3);
        padding:0px 25px;
        text-align: center;


    }
    .list-box li:nth-child(3n+1){
       margin-top: 50px;
    }
    .list-box li:nth-child(1){
        display: inline-block;
    }

    .list-box li div{
       left:0px;
        top:0px;
        position: relative;
        transition: all 0.2s linear;
    }
    .list-box li:hover div{
        left:10px;
        top:-10px;

    }
    .list-box li div img{
        width:200px;

    }
</style>