<template>
  <div id="app">
    <meta name="viewport" content="width=device-width, initial-scale = 1">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
  components: {

  }
}
</script>

<style>
  #app{
    background: url("./assets/img/bg-01.svg") no-repeat center center ;
    background-size: 100% 100%;

  }
  img {
    width: 20%;
    display: block;
    margin: 0 auto;
  }
</style>
