import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {getAllMetaData} from './data/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    solutions:[],
    industry:[],
    
  },
  mutations: {
    setSolution(state,payload){
      state.solutions = payload
    },
    setIndustry(state, industry){
      state.industry = industry
    }
  },
  actions: {
    
  }
})
