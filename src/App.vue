<template lang="pug">
  #app.container-fluid
    .row.h-100.position-relative.flex-column.flex-md-row
      .col-12.col-md-3.border.text-center
        .logo.mx-auto
          img.img-fluid(src="./assets/taipeilogo.png")
        h1.h3.title 108年臺北市人口戶數及性別
      .col-12.col-md-9.container-fluid.flex-grow-1.position-relative.center-children
        section(
          v-if="isLoading"
          class="pt-3 pt-md-0 h-100 w-100 d-flex justify-content-center align-items-center")
          .spinner-border
        section.pt-3.d-flex.flex-column.overflow-auto(v-else)
          div
            label.form-label.me-3 地區
            select.form-select.zone-select.d-inline-block(v-model="selectedDistrictName")
              option(v-for="name in districts") {{name}}
          .w-100.mx-auto.flex-grow-1.position-relative
            HouseholdBarChart(
              v-if="selectedDistrictName"
              v-bind="selectedDistrict(selectedDistrictName)"
            )
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import HouseholdBarChart from './components/HouseholdBarChart.vue'

export default {
  name: 'App',
  components: { HouseholdBarChart },
  data() {
    return {
      selectedDistrictName: undefined
    }
  },
  beforeMount() {
    if (!this.$store.state.household.loaded) {
      this.loadData()
    }
  },
  methods: {
    ...mapActions('household', ['loadData'])
  },
  computed: {
    ...mapGetters('household', [
      'districts',
      'selectedDistrict',
      'isLoading'
    ]),
    loaded() {
      return this.$store.state.household.loaded
    }
  },
  watch: {
    loaded(isLoaded) {
      if (isLoaded) {
        const [firstDistrictName] = this.districts
        this.selectedDistrictName = firstDistrictName
      }
    }
  }
}
</script>

<style lang="scss">
@import "./scss/main.scss";
html body{
  padding: 0;
  margin: 0;
}
#app{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  min-height: 400px;
}
.h-120px{
  height: 120px;
}
.hover:hover{
  cursor: pointer;
}
h1, h2, h3, h4, h5, h6{
  font-size: 1rem;
  font-weight: inherit;
  margin: 0;
  padding: 0;
  display: inline-block;
  line-height: inherit;
}
// @include media-breakpoint-up(md) {
//   .main {
//     height: 100%;
//   }
// }
.logo{
  max-width: 100px;
}
.zone-select{
  width: 200px;
}

.center-children{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
