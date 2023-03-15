<template>
  <div class="OpacityBox">
    <div class="title">日期范围</div>
    <div class="formItemBox">
      <div class="item" v-for="item in dateOpaction" :key="item.key" :class="selectDate==item.val?'selected':''">
        <div class="itemhowes">
          <label>
            <input type="radio" id="dateRadio" :value="item.val" v-model="selectDate"/>
            {{item.label}}
          </label>
        </div>
      </div>
    </div>
    <br>
    <div class="title">时间范围</div>
    <div class="formItemBox">
      <div class="item" v-for="item in timeOpaction" :key="item.key" :class="selectTime==item.val?'selected':''">
        <div class="itemhowes">
          <label>
            <input type="radio" id="timeRadio" :value="item.val" v-model="selectTime"/>
            {{item.label}}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OpacityBox',
  data(){
    return{
      selectDate:0,
      selectTime:0,
      dateOpaction:[
        {key:'all',val:0,label:'所有数据'},
        {key:'year',val:1,label:'最近三年'},
        {key:'month',val:2,label:'最近一年'},
        {key:'week',val:3,label:'最近仨月'}
      ],
      timeOpaction:[
        {key:'all',val:0,label:'所有数据'},
        {key:'Nine',val:1,label:'九小时内'},
        {key:'three',val:2,label:'三小时内'},
        {key:'one',val:3,label:'一小时内'},
      ]
    }
  },
  watch:{
    selectDate(val){
      this.$store.commit('SETDATA',val)
    },
    selectTime(val){
      console.log('时间发生改变',val)
    }
  }
}
</script>

<style scoped>
.OpacityBox{
  color: #999;
  margin:50px 50px 50px 0px;
  height: calc(100% - 40px);
}
.title{
  text-align: center;
  font-size: 36px;
  cursor:default;
}
.formItemBox{
  height: 36px;
  line-height: 36px;
  border: 2px #333 solid;
  border-radius: 12px;
  display: flex;
  overflow: hidden;
}
.item{
  flex:1 1 auto;
  text-align: center;
  cursor:pointer;
}
.itemhowes:hover{
  background: rgba(255,255,255,0.1);
}
.item+.item{
  border-left: 1px #999 solid;
}
input{
  display: none;
}
.selected{
  color: #eee;
  background: #55b;
}
</style>
