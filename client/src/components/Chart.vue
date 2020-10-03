<template>
  <div class="section">
    <h4 >Выберите {{nameOfOption}}</h4>
    <select
      v-model="filter"
      class="btn dropdown-trigger blue darken-4 "
      data-target="dropdown2"
      id="dropdown2"
    >
      <option v-if="choice==='area'" value="Все">Всe</option>
      <option v-for="(item,i) of optionSet" :key="i" value:item >{{item}}</option>
    </select>
    <div v-if="datacollection">
      <bar-chart :chartData="datacollection" :options="options"></bar-chart>
    </div>

    <!--  </div>-->
  </div>
</template>

<script>
export default {
    
  props: ["optionSet", "teachers", "choice" , "nameOfOption"],
  name: "Chart",
   data() {
    return {
      filter: "", //this.choice === 'area' ? 'all' : '',
      size: Number,
      root: "",
      datacollection: null,
      color: [
        "rgb(25, 152, 161)",
        "rgb(190, 255, 115)",
        "red",
        "rgb(148, 42, 0)",
        "rgb(0, 85, 196)",
        "rgb(0, 190, 196)",
        "rgb(255, 224, 139)",
        "rgb(24, 67, 255)",
        "rgb(21, 104, 0)",
        "#fcac45",
        "#f87979"
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    };
  },
}
</script>