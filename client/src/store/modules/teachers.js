import axios from "axios";
export default {
    actions: {
        async fetchTeachers(ctx) {
            await axios
                .get("/api")
                .then(response => {
                    const teachers = response.data;
                    ctx.commit('updateTeachers',teachers)
                    
                })
                .catch(e => {
                    console.error(e);
                });
                await axios
                .get("/api/schools")
                .then(response => {
                    const schools = response.data;
                    ctx.commit('updateSchoolSet',schools);
                }).catch(e => {
                    console.error(e);
                });
                await axios
                .get('api/states')
                .then(response =>{
                    const states = response.data
                    ctx.commit('updateStateSet',states);
                    ctx.commit('load', true);
                }).catch(e => {
                    console.error(e);
                });
        }
    },
    mutations: {
        updateTeachers(state, teachers) {
            state.teachers = teachers
        },
        updateStateSet(state, stateSet) {
            state.stateSet = stateSet
        },
        updateSchoolSet(state, schoolSet) {
            state.schoolSet = schoolSet
        },
        load(state, loader) {
            state.loader = loader
        }
    },
    state: {
        teachers: [],
        stateSet: null,
        schoolSet: null,
        loader: false
    },
    getters: {
        dumpTeachers(state) {
            return state.teachers
        },
        getStateSet(state) {
            return state.stateSet
        },
        getSchoolSet(state) {
            return state.schoolSet
        },
        getLoader(state) {
            return state.loader
        }
    }
}