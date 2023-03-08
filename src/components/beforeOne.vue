<template>
  <div class="LineChart" ref='LineChart' :key="LineChart"/>
</template>

<script>
import * as echarts from 'echarts';
import {QuotationsApi} from "@/axios/api";

export default {
  name: 'HistoricalTrend',
  props: {
    msg: String
  },
  data(){
    return {
      // 从上海黄金交易所获取的数据
      times:[],
      data:[],
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
          data: this.times
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
            data:this.data,
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
    const _this=this
    this.getData().then(()=>_this.updataShow())
    setInterval(()=>{
      this.getData().then(()=>_this.updataShow())
    },30000)


  },
  methods:{
    // 获取上海黄金交易所的历史数据
    async getData(){
      await QuotationsApi({instid:'Au99.99'}).then(response=>{
        if(response){
          let flg=true
          let timeArr=response.data.reverse().filter((item,index,arr)=>{
            if(flg==false || index==0 ){
              return true
            }else if(item!=arr[0]){
              flg=false
              return true
            }else{
              return false
            }
          })
          timeArr.reverse()
          timeArr.pop()
          this.data=[]
          this.data.push(...timeArr)
          this.times=[]
          this.times.push(...response.times.slice(0,timeArr.length))
        }
      }).catch(msg=>{console.log(msg)})
    },
    // 更新视图
    updataShow(){
      // echar 视图不会随浏览器窗口改变而改变，每次更新需要重新定义KEY 值用于跟新dom
      this.LineChart=Math.ceil(Math.random()*1000)
      this.$nextTick(()=>{
        this.myChart = echarts.init(this.$refs.LineChart,'dark')
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
