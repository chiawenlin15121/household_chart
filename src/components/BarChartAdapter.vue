<script>
import { Bar } from 'vue-chartjs'
import ChartDatalabelsPlugin from 'chartjs-plugin-datalabels'

export default {
  extends: Bar,
  props: ['data', 'options'],
  mounted() {
    this.addPlugin(ChartDatalabelsPlugin)
    this.redraw()
  },
  methods: {
    redraw() {
      this.renderChart(this.data, this.options)
    }
  },
  watch: {
    data: {
      deep: true,
      handler() { this.redraw() }
    }
    // ,
    // options: {
    //   deep: true,
    //   handler() { this.redraw() }
    // }
  }
}
</script>
