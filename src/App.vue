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
      <OpacityBox/>
    </div>
  </div>
</template>

<script>
import HistoricalTrend from './components/HistoricalTrend.vue'
import beforeOne from "@/components/beforeOne";
import OpacityBox from "@/components/OpacityBox.vue";

export default {
  name: 'App',
  components: {
    OpacityBox,
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
