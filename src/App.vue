<template>
  <div class="layrout">
    <div class="left">
      <div class="top">
        <HistoricalTrend  ref="HistoricalTrend"/>
      </div>
      <div class="bottom">
        <beforeOne  ref="HistoricalTrend2"/>
      </div>

    </div>
    <div class="right">
      <div class="top">
        <HistoricalTrend  ref="HistoricalTrend3"/>
      </div>
      <div class="bottom">
        <HistoricalTrend  ref="HistoricalTrend4"/>
      </div>
    </div>
  </div>
</template>

<script>
import HistoricalTrend from './components/HistoricalTrend.vue'
import beforeOne from "@/components/beforeOne";

export default {
  name: 'App',
  components: {
    HistoricalTrend,
    beforeOne
  },
  mounted() {
    window.addEventListener('resize', this.resizeFun,true)
  },
  methods:{
    resizeFun(){
      this.$refs.HistoricalTrend.updataShow()
      this.$refs.HistoricalTrend2.updataShow()
      this.$refs.HistoricalTrend3.updataShow()
      this.$refs.HistoricalTrend4.updataShow()
    }
  }
}
</script>

<style scoped>
.layrout{
  height: 100vh;
  width: 100%;
  display: flex;
  background: #112;
}
.left{
  flex: 0 0 80%;
  display: flex;
  flex-direction: column;
}
.right{
  flex: 0 0 20%;
  display: flex;
  flex-direction: column;
}
.top{
  flex:0 0 70%;
}
.bottom{
  flex:0 0 30%;
}
</style>
