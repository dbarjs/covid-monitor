import axios from 'axios'

export const state = () => ({
  data: {
    areas: []
  }
})

export const mutations = {
  setData: (state, data) => {
    state.data = data
  }
}

export const getters = {
  getData: (state) => state.data,
  getAreaList: (state) => state.data.areas
}

export const actions = {
  fetchData: (context, url) => {
    const corsAnywhereURL = 'https://cors-anywhere.herokuapp.com/'
    axios
      .get(corsAnywhereURL + url, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then((result) => {
        context.commit('setData', result.data)
      })
  }
}
