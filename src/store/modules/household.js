import axios from 'axios'
import districtFilter from '../../helper/districtFilter'

const HOUSEHOLD_API_URL = 'devapi/api/v1/rest/datastore/301000000A-000082-041'
const TARGET_CITY_NAME = '臺北市'

const defaultState = () => ({
  dataMap: {},
  loaded: false,
  loadingFailed: false
})

// getters
const getters = {
  selectedDistrict: (state) => (zone) => state.dataMap[zone],
  districts: (state) => Object.keys(state.dataMap),
  isLoading: (state) => !state.loaded && !state.loadingFailed
}

// actions
const actions = {
  loadData: ({
    commit
  }) => {
    axios.get(HOUSEHOLD_API_URL).then((res) => {
      const {
        success,
        result: {
          records
        }
      } = res.data
      if (!success) {
        commit('setLoadingStatus', false)
        return
      }
      commit('setDataMap', districtFilter(records.slice(1), TARGET_CITY_NAME))
      commit('setLoadingStatus', true)
    }).catch(() => {
      commit('setLoadingStatus', false)
    })
  }
}

// mutations
const mutations = {
  setLoadingStatus(state, success) {
    state.loadingFailed = !success
    state.loaded = success
  },
  setDataMap(state, data) {
    state.dataMap = data
  }
}

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations
}