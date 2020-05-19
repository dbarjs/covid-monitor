import { firestoreAction } from 'vuexfire'
import { statesRef, database } from '~/firebase'

export const data = () => ({
  cities: []
})

export const getters = {}

export const actions = {
  bindStates: firestoreAction((context) => {
    context.bindFirestoreRef('cities', statesRef)
  }),
  updateStates: (context) => {
    const states = context.rootGetters.getStates
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
