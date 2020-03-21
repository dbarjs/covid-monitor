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
    axios.get(url).then((result) => {
      context.commit('setData', result.data)
    })
  }
}
