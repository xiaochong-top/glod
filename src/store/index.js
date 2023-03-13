import {createStore} from 'vuex'
import {historyDataApi, todayDataApi} from "@/axios/api";

export default createStore({
    state: {
        // 从上海黄金交易所获取的历史数据
        historyData:[],
        todayData:[]
    },
    mutations: {
        SETHISTORYDATA(state,val){
            state.historyData=val
        },
        SETTODAYDATA(state,val){
            state.todayData=val
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