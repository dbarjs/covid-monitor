import { firestoreAction } from 'vuexfire'
import { statesRef, database } from '~/firebase'

export const state = () => ({
  states: []
})

export const getters = {
  getStates: (state) => (state.states.length ? [...state.states] : []),
  getCities: (state, getters) =>
    getters.getStates.reduce((list, { state, cities }) => {
      Object.keys(cities).map((cityId) =>
        list.push({
          cityId,
          state,
          name: cities[cityId].city
        })
      )
      return list
    }, []),
  getCityNames: (state, getters) => getters.getCities.map(({ city }) => city)
}

export const actions = {
  bindStates: firestoreAction((context) => {
    context.bindFirestoreRef('states', statesRef.orderBy('totalCases', 'desc'))
  }),
  updateStates: (context) => {
    const states = context.rootGetters['fetch/getStates']
    const batch = database.batch()
    Object.values(states).map((state) => {
      const stateId = state.state
      try {
        batch.set(statesRef.doc(stateId), state)
      } catch {}
    })
    batch.commit().then(function() {
      // eslint-disable-next-line
      console.log(`write ${Object.keys(states).length} records`)
      context.dispatch('config/updateStatus', statesRef, { root: true })
    })
  }
}
