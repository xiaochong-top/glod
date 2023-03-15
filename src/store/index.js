import {createStore} from 'vuex'
import {historyDataApi, todayDataApi} from "@/axios/api";

export default createStore({
    state: {
        // 从上海黄金交易所获取的历史数据
        historyData:[],
        todayData:[],
        data:0,
        tiem:0
    },
    getters:{
        showhistoryData(state){
            if(state.data==0){
                return state.historyData
            }else if(state.data==1){
                return state.historyData.slice(-(52*5*3))
            }else if(state.data==2){
                return state.historyData.slice(-(52*5))
            }else if(state.data==3){
                return state.historyData.slice(-66)
            }
        },
        showtodayData(state){
            // let now=new Date().getTime()
            return state.todayData
        }
    },
    mutations: {
        SETHISTORYDATA(state,val){
            state.historyData=val
        },
        SETTODAYDATA(state,val){
            state.todayData=val
        },
        SETDATA(state,val){
            state.data=val
        },
        SETTIME(state,val){
            state.time=val
        }
    },
    actions: {
        async getHistoryData(context){
            await historyDataApi({'instid':'Au99.99'}).then(response=>{
                if(response){context.commit('SETHISTORYDATA',response.time)}
            }).catch(msg=>{console.log(msg)})
        },
        async getTodayData(context){
            await todayDataApi({instid:'Au99.99'}).then(response=>{
                if(response){
                    let timeArr=new Array()
                    timeArr=response.times.map((item,index)=>{return [item,response.data[index]]})
                    context.commit('SETTODAYDATA',timeArr)
                }
            }).catch(msg=>{console.log(msg)})
        }
    },
})