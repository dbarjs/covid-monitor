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
  async nuxtServerInit({ dispatch }) {
    const apiURL =
      'https://www.bing.com/covid/data?fbclid=IwAR0H3Pf41agrGI7BFRj-YpSujrSnpXt7VRQ-4geg9BtsxCZPZGCQDFD4X8Y&IG=5478213FEBF343D89A5F43FAC6815CCD'
    await dispatch('fetchData', apiURL)
  },
  async fetchData({ commit }, url) {
    // const corsAnywhereURL = 'https://cors-anywhere.herokuapp.com/'
    const response = await this.$axios.get(url, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
    commit('setData', response.data)
  }
}
