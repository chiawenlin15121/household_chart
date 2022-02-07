/* eslint-disable camelcase */
import District from '../models/District'

const household_ordinary_m_key = 'household_ordinary_m'
const household_ordinary_f_key = 'household_ordinary_f'
const household_single_m_key = 'household_single_m'
const household_single_f_key = 'household_single_f'
function districtJSONToObject(districtJSON) {
  return new District({
    householdOrdinaryF: parseInt(districtJSON[household_ordinary_f_key], 10),
    householdOrdinaryM: parseInt(districtJSON[household_ordinary_m_key], 10),
    householdSingleF: parseInt(districtJSON[household_single_f_key], 10),
    householdSingleM: parseInt(districtJSON[household_single_m_key], 10)
  })
}

export default function filterAndMappingDistrict(list, targetCityName) {
  const districtMap = {}
  list.forEach((district) => {
    if (district.site_id.includes(targetCityName)) {
      const districtName = district.site_id.substring(3)
      const districtObject = districtJSONToObject(district)
      if (!districtMap[districtName]) {
        districtMap[districtName] = districtObject
      } else {
        districtMap[districtName].add(districtObject)
      }
    }
  })
  return districtMap
}
