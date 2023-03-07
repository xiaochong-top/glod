<template>
  <HistoricalTrend ref="HistoricalTrend"/>
</template>

<script>
import HistoricalTrend from './components/HistoricalTrend.vue'

export default {
  name: 'App',
  components: {
    HistoricalTrend
  },
  mounted() {
    window.addEventListener('resize', this.resizeFun,true)
  },
  methods:{
    resizeFun(){
      this.$refs.HistoricalTrend.updataShow()
    }
  }
}
</script>

<style>
</style>
