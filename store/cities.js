import store from 'store2'
import { firestoreAction } from 'vuexfire'
import { citiesRef, database } from '~/firebase'

export const state = () => ({
  cities: [],
  selectedCities: []
})

export const mutations = {
  SET_SELECTED_CITIES: (state, selectedCities) =>
    (state.selectedCities = Array.isArray(selectedCities)
      ? selectedCities
      : []),
  ADD_SELECTED_CITY: (state, cityId) => {
    if (!state.selectedCities.find((id) => id === cityId)) {
      state.selectedCities.push(cityId)
      store('selectedCities', state.selectedCities)
      return true
    }
    return false
  },
  REMOVE_SELECTED_CITY: (state, cityId) => {
    const index = state.selectedCities.findIndex((id) => id === cityId)
    if (index) {
      state.selectedCities.splice(index, 1)
    }
  }
}

export const getters = {
  getSelectedCities: (state) => state.selectedCities
}

export const actions = {
  bindCities: firestoreAction((context) => {
    context.bindFirestoreRef('cities', citiesRef)
  }),
  getSelectedCitiesFromStore: ({ commit }) =>
    commit('SET_SELECTED_CITIES', store('selectedCities')),
  updateCities: (context, all = false) => {
    const lastDate = context.rootGetters['config/getLastDate'].cities
    const cities = context.rootGetters['fetch/getCities'](
      all ? false : lastDate
    )
    const cityList = Object.keys(cities)
    let counter = 0
    function update(currentIndex = 0, limit = 500) {
      counter = currentIndex
      const batch = database.batch()
      while (counter < currentIndex + limit && counter < cityList.length) {
        const cityId = cityList[counter]
        batch.set(citiesRef.doc(cityId), cities[cityId], { merge: true })
        counter++
      }
      batch.commit().then(function() {
        // eslint-disable-next-line
        console.log(`write ${counter} records`)
        if (counter < cityList.length) {
          setTimeout(() => {
            update(counter)
          }, 500)
        } else {
          context.dispatch('config/updateStatus', citiesRef, { root: true })
        }
      })
    }
    update()
  }
}
