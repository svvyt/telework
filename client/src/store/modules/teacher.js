import axios from "axios";
export default {
    actions: {
        async fetchTeachers(ctx) {
            await axios
                .get("/api")
                .then(response => {
                    const areaSet = new Set();
                    const schoolSet = new Set();
                    response.data.map((item) => {
                        schoolSet.add(item.school.trim());
                        areaSet.add(item.Area.trim());
                    })
                    ctx.commit('updateTeachers', response.data);
                    ctx.commit('updateAreaSet', areaSet);
                    ctx.commit('updateSchoolSet', schoolSet);
                    // let loader = true;
                    ctx.commit('load', true);
                    //loader = true;
                })
                .catch(e => {
                    console.error(e);
                });
        }
    },
    mutations: {
        updateTeachers(state, teachers) {
            state.teachers = teachers
        },
        updateAreaSet(state, areaSet) {
            state.areaSet = areaSet
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
        areaSet: null,
        schoolSet: null,
        loader: false
    },
    getters: {
        dumpTeachers(state) {
            return state.teachers
        },
        getAreaSet(state) {
            return state.areaSet
        },
        getSchoolSet(state) {
            return state.schoolSet
        },
        getLoader(state) {
            return state.loader
        }
    }
}