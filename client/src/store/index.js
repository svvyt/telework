import Vue from 'vue'
import Vuex from 'vuex'
import teachers from './modules/teachers'
Vue.use(Vuex)

export default new Vuex.Store({

    modules: {
        teachers
    }
})