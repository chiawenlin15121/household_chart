<template lang="pug">
  BarChartAdapter(:data="chartdata", :options="options")
</template>
<script>
import BarChartAdapter from './BarChartAdapter.vue'

export default {
  props: {
    householdOrdinaryM: {
      type: Number,
      default: 0
    },
    householdOrdinaryF: {
      type: Number,
      default: 0
    },
    householdSingleM: {
      type: Number,
      default: 0
    },
    householdSingleF: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          datalabels: {
            color: '#36A2EB',
            anchor: 'end',
            align: 'top',
            font: {
              weight: 'bold'
            }
          }
        }
      }
    }
  },
  components: { BarChartAdapter },
  computed: {
    chartdata() {
      return {
        labels: ['共同生活戶', '獨立生活戶'],
        datasets: [
          {
            label: '男',
            data: [this.householdOrdinaryM, this.householdSingleM],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1
          },
          {
            label: '女',
            data: [this.householdOrdinaryF, this.householdSingleF],
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgb(255, 159, 64)',
            borderWidth: 1
          }
        ]
      }
    }
  }
}
</script>

<style>
</style>
