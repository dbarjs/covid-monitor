import { firestoreAction } from 'vuexfire'
import { statesRef, citiesRef, Timestamp } from '~/firebase'

export const state = () => ({
  cities: {},
  states: {},
  countries: {}
})

export const getters = {
  getLastDate: (state) => ({
    cities: state.cities?.lastDate || false,
    states: state.states?.lastDate || false,
    countries: state.countries?.lastDate || false
  })
}

export const actions = {
  bindConfig: firestoreAction((context) => {
    context.bindFirestoreRef('cities', citiesRef.doc('status'))
    context.bindFirestoreRef('states', statesRef.doc('status'))
    context.bindFirestoreRef('countries', statesRef.doc('status'))
  }),
  updateStatus: (context, collectionRef = false) => {
    if (collectionRef) {
      collectionRef
        .doc('status')
        .set(
          {
            lastDate: context.rootGetters.getLastDateInEntries,
            updated: Timestamp.now()
          },
          { merge: true }
        )
        .then(function() {
          // eslint-disable-next-line
          console.log('data status updated!')
        })
    }
  }
}
