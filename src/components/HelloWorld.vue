<template>
  <div id="hello"/>
</template>

<script>
import * as echarts from 'echarts';
import {DailyhqApi} from "@/axios/api";

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      // 从上海黄金交易所获取的数据
      soursData:[]
    }
  },
  computed:{
    showData(){
      const timeObj={
        xAxis: {
          // x轴每个点对应的数据
          data: this.soursData.map(item=>item[0])
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
            type: 'candlestick',
            // X轴上的每个点
            data:this.soursData.map(item=>{
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
            // start: 90,
            // end: 100,
            minValueSpan: 10
          }
        ],
        grid: [
          {
            left: '10%',
            right: '8%',
            bottom: 150
          }
        ]
      }
      return timeObj
    }
  },
  created() {

  },
  mounted() {
    this.PageUpdata()
  },
  updated(){


  },
  methods:{
    PageUpdata(){
      DailyhqApi({instid:'Au99.99'}).then(response=>{
        if(response){
          this.soursData.push(...response.time)
          this.myChart = echarts.init(document.getElementById('hello'),'dark')
          this.myChart.setOption(this.showData);
        }
      }).catch(msg=>{
        console.log(msg)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#hello{
  height: 100vh;
  width: 100%;
  /*border: 1px solid pink;*/
  /*background-color: black;*/
}
</style>
