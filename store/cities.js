import { firestoreAction } from 'vuexfire'
import { citiesRef, database } from '~/firebase'

export const data = () => ({
  cities: []
})

export const getters = {}

export const actions = {
  bindCities: firestoreAction((context) => {
    context.bindFirestoreRef('cities', citiesRef)
  }),
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
