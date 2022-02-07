export default class District {
  constructor({
    householdOrdinaryM,
    householdOrdinaryF,
    householdSingleM,
    householdSingleF
  }) {
    this.householdOrdinaryM = householdOrdinaryM || 0
    this.householdOrdinaryF = householdOrdinaryF || 0
    this.householdSingleM = householdSingleM || 0
    this.householdSingleF = householdSingleF || 0
  }

  add(anotherDistrict) {
    this.householdOrdinaryM += anotherDistrict.householdOrdinaryM
    this.householdOrdinaryF += anotherDistrict.householdOrdinaryF
    this.householdSingleM += anotherDistrict.householdSingleM
    this.householdSingleF += anotherDistrict.householdSingleF
  }
}
