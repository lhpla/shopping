import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//状态共享 所有的组件都可以使用的公共数据
export default new Vuex.Store({
  //公共数据
  state: {
    num:0
  },
  //改变state的值
  mutations: {
    setNum(state,data){
      state.num = data 
    }
  },
  actions: {
  },
  modules: {
  }
})
