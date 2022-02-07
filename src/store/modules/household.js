import axios from 'axios'
import districtFilter from '../../helper/districtFilter'

// const HOUSEHOLD_API_HOST = process.env.NODE_ENV === 'production' ? 'https://od.moi.gov.tw' : 'devapi'
// const HOUSEHOLD_API_URL = `${HOUSEHOLD_API_HOST}/api/v1/rest/datastore/301000000A-000082-041`
const HOUSEHOLD_API_URL = 'http://localhost:3000'
// const HOUSEHOLD_API_URL = 'https://nodejs-cors-proxy.herokuapp.com'
// const HOUSEHOLD_API_URL = 'https://cors-anywhere.herokuapp.com'
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
    commit('setLoading')
    axios.get(`${HOUSEHOLD_API_URL}/od.moi.gov.tw:443/api/v1/rest/datastore/301000000A-000082-041`).then((res) => {
      const {
        success,
        result: {
          records
        }
      } = res.data
      if (!success) {
        commit('setLoadStatus', false)
        return
      }
      commit('setDataMap', districtFilter(records.slice(1), TARGET_CITY_NAME))
      commit('setLoadStatus', true)
    }).catch(() => {
      commit('setLoadStatus', false)
    })
  }
}

// mutations
const mutations = {
  setLoading(state) {
    state.loadingFailed = false
    state.loaded = false
  },
  setLoadStatus(state, success) {
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
