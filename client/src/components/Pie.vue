<template>
  <div class="section">
    <h4>Выберите {{ optionName }}</h4>
    <select
      v-model="filter"
      class="btn dropdown-trigger blue darken-4"
      data-target="dropdown2"
      id="dropdown2"
    >
      <option value="Все">Всe</option>
      <option v-for="(item, i) of optionSet" :key="i" value:item>
        {{ item }}
      </option>
    </select>
    <div v-if="datacollection">
      <pie-chart :chartData="datacollection" :options="options"></pie-chart>
    </div>

    <!--  </div>-->
  </div>
</template>



<script>
import PieChart from "./PieChart.js";
export default {
  props: ["optionSet", "teachers", "optionName"],
  name: "Chart",
  data() {
    return {
      filter: "", //this.choice === 'area' ? 'all' : '',
      size: Number,
      root: "",
      datacollection: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  },
  updated() {
    if (this.filter === "") {
      this.filter = "Все";
      this.fillData(this.filter,this.optionSet);
    }
  },
  components: {
    PieChart,
  },
  watch: {
    filter(value) {
      if (value !== this.root) {
        console.log(this.filter);
        this.root = value;
        this.fillData(this.filter);
      }
    },
  },

  methods: {
    fillData: function (value,optionSet) {
    console.log(optionSet)
      let teacherMap2 = new Map();
      for (let item of this.teachers) {
        if (
          item.platform.trim() !== "Дневник.ру" &&
          item.platform.trim() !== "дневник.ру"
        ) {
          if (value === "Все") {
            if (teacherMap2.has(item.platform.trim())) {
              let counter = teacherMap2.get(item.platform.trim());
              counter++;
              teacherMap2.set(item.platform.trim(), counter);
            } else {
              teacherMap2.set(item.platform.trim(), 1);
            }
          }
          if (item.state.trim() === value) {
            if (teacherMap2.has(item.platform.trim())) {
              let counter = teacherMap2.get(item.platform.trim());
              counter++;
              teacherMap2.set(item.platform.trim(), counter);
            } else {
              teacherMap2.set(item.platform.trim(), 1);
            }
          }
        }
      }
      const keys = [];
      const values = [];
      let idx = 0;
      for (let i of teacherMap2.keys()) {
        keys[idx] = i;
        idx++;
      }
      idx = 0;
      let sum = 0
      for (let i of teacherMap2.values()) {
        values[idx] = i;
        sum += values[idx]
        idx++;
      }
      const colors = [];
      for(let i = 0; i < values.length;i++){
          colors.push(`rgb(${Math.random()*250},${Math.random()*50+120},${Math.random()*250})`)
          
      }
      console.log(`values = ${10.53 + 31.58 + 26.32 +31.58}`)
      let labels = keys.map((item,idx)=>(
        `${item}(${((values[idx] / sum) * 100).toFixed(
            2
          )}%)`
      ))
      this.datacollection = {
        labels:[...labels],
        
        datasets: [{
             data : [...values],
             borderWidth: 0.8,
             borderColor:['#fff'],
             backgroundColor:[...colors]
        }],
      };
    },
  },
};
</script>

