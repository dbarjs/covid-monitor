import { firestoreAction } from 'vuexfire'
import { countriesRef, Timestamp } from '~/firebase'

export const state = () => ({
  countries: {}
})

export const getters = {
  getCountries: (state) => state.countries || [],
  getCountryById: (state, getters) => (countryId) =>
    getters.getCountries.find((country) => country.countryId === countryId)
}

export const actions = {
  bindCountries: firestoreAction((context) => {
    context.bindFirestoreRef('countries', countriesRef)
  }),
  updateCountries: (context) => {
    Object.values(context.rootGetters['fetch/getCountries']).forEach(
      (country) => {
        try {
          countriesRef
            .doc(country.countryId)
            .set({ ...country, updated: Timestamp.now() }, { merge: true })
            .then(function() {
              context.dispatch('config/updateStatus', countriesRef, {
                root: true
              })
            })
        } catch (e) {
          // eslint-disable-next-line
          console.error(e)
        }
      }
    )
  }
}
