import { firestoreAction } from 'vuexfire'
import { countriesRef } from '~/firebase'

export const data = () => ({
  countries: []
})

export const getters = {}

export const actions = {
  bindCountries: firestoreAction((context) => {
    context.bindFirestoreRef('cities', countriesRef)
  }),
  updateCountries: (context) => {
    Object.values(context.rootGetters.getCountries).forEach((country) => {
      countriesRef
        .doc(country.countryId)
        .set(country, { merge: true })
        .then(function() {
          context.dispatch('config/updateStatus', countriesRef, { root: true })
        })
    })
  }
}
