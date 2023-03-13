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
          // 每个点对应的Y值
          data:this.$store.state.todayData.map(item=>item[0])
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
            // 折线图
            type: 'line',
            // X轴上的每个点
            data:this.$store.state.todayData.map(item=>item[1]),
            // 填充线下面积，折线图变面积图
            areaStyle: {}
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
          },
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
    setInterval(this.dataToPage(),10000)
  },
  methods:{
    // 从状态管理获取数据，并更新到页面
    dataToPage(){
      const _this=this
      this.$store.dispatch('getTodayData').then(()=>{
        _this.updataShow()
      })
      return this.dataToPage
    },
    // 更新视图
    updataShow(){
      // echar 视图不会随浏览器窗口改变而改变，每次更新需要重新定义KEY 值用于跟新dom
      this.LineChart=Math.ceil(Math.random()*1000)
      this.$nextTick(()=>{
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
