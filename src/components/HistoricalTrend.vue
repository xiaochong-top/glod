<template>
  <div class="LineChart" ref='LineChart' :key="LineChart"/>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'HistoricalTrend',
  props: {
    msg: String
  },
  data(){
    return {
      // 历史折线图 dom KEY
      LineChart:''
    }
  },
  computed:{
    // 历史折线图的 echarts 配置对象
    showData(){
      return {
        xAxis: {
          // x轴每个点对应的数据
          data: this.$store.state.historyData.map(item=>item[0])
        },
        yAxis:[
          // 如果不配置会丢失纵轴的自适应
          {
            scale: true,
            splitArea: {
              show: true
            }
          }
        ],
        series: [
          {
            // k线图
            type: 'candlestick',
            // X轴上的每个点
            data:this.$store.state.historyData.map(item=>{
              const timeArr=item.filter((item,index)=>index!=0)
              return timeArr
            })
          }
        ],
        // 时间轴下方滑块
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 100,
            minValueSpan: 10
          },
          {
            show: true,
            type: 'slider',
            bottom: 60,
            minValueSpan: 10
          }
        ],
        // 鼠标悬浮的标记线
        tooltip: {
          // 悬浮弹窗，白色的，影响样式
          // trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: [
          {
            left: '10%',
            right: '8%',
            bottom: 150
          }
        ]
      }
    }
  },
  mounted() {
    const _this=this
    this.$store.dispatch('getHistoryData').then(()=>{
      _this.updataShow()
    }
    )
  },
  methods:{
    // 更新视图
    updataShow(){
      // echar 视图不会随浏览器窗口改变而改变，每次更新需要重新定义KEY 值用于跟新dom
      this.LineChart=Math.random()
      this.$nextTick(()=>{
        // this.myChart = echarts.init(this.$refs.LineChart,'dark')
        this.myChart = echarts.init(this.$refs.LineChart)
        this.myChart.setOption(this.showData);
      })
    }
  }
}
</script>

<style scoped>
.LineChart{
  height: 100%;
  width: 100%;
}
</style>
