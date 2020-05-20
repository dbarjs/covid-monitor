import parse from 'csv-parse/lib/sync'
import autoParse from 'auto-parse'

export const mutations = {
  SET_KEYS: (state, keys) => (state.keys = keys),
  SET_ENTRIES: (state, entries) => (state.entries = entries),
  SET_LAST_DATE: (state, lastDate) => (state.lastDate = lastDate)
}

export const state = () => ({
  keys: [],
  entries: [],
  lastDate: '2020-01-01'
})

export const getters = {
  getKeys: (state) => state.keys,
  getEntries: (state) => (lastDate = false) =>
    lastDate
      ? state.entries.reduce((entries, entry) => {
          if (entry.date >= lastDate) {
            entries.push(entry)
          }
          return entries
        }, [])
      : state.entries,
  getLastDateInEntries: (state) => state.lastDate,
  getCities: (state, getters) => (lastDate = false) =>
    getters.getEntries(lastDate).reduce((cities, entry) => {
      const cityId = entry.ibgeID
      if (!cities[cityId]) {
        // create city
        cities[cityId] = {
          ibgeID: entry.ibgeID,
          country: entry.country,
          state: entry.state,
          city: entry.city,
          entries: []
        }
      }
      cities[cityId].newDeaths = entry.newDeaths
      cities[cityId].deaths = entry.deaths
      cities[cityId].newCases = entry.newCases
      cities[cityId].totalCases = entry.totalCases
      cities[cityId].deaths_by_totalCases = entry.deaths_by_totalCases
      cities[cityId].deaths_per_100k_inhabitants =
        entry.deaths_per_100k_inhabitants
      cities[cityId].totalCases_per_100k_inhabitants = entry.totalCases
      cities[cityId].entries.push({
        date: entry.date,
        newDeaths: entry.newDeaths,
        deaths: entry.deaths,
        newCases: entry.newCases,
        totalCases: entry.totalCases,
        _source: entry._source
      })
      return cities
    }, {}),
  getStates: (state, getters) =>
    getters.getEntries().reduce((states, entry) => {
      if (entry?.state) {
        const cityId = entry.ibgeID
        const stateId = entry.state
        if (!states[stateId]) {
          states[stateId] = {
            country: entry.country,
            state: entry.state,
            deaths: 0,
            cases: 0,
            cities: {}
          }
        }
        states[stateId].deaths += entry.newDeaths
        states[stateId].cases += entry.newCases
        states[stateId].cities[cityId] = {
          _source: entry._source,
          city: entry.city,
          deaths: entry.deaths,
          totalCases: entry.totalCases
        }
      }
      return states
    }, {}),
  getCountries: (state, getters) =>
    getters.getEntries().reduce((countries, entry) => {
      if (entry.country) {
        const countryId = entry.country
        const date = entry.date
        if (!countries[countryId]) {
          countries[countryId] = {
            countryId,
            deaths: 0,
            newDeaths: 0,
            totalCases: 0,
            newCases: 0,
            history: {},
            lastDate: state.lastDate
          }
        }
        countries[countryId].totalCases += entry.newCases
        countries[countryId].deaths += entry.newDeaths
        if (!countries[countryId].history[date]) {
          countries[countryId].history[date] = {
            newCases: 0,
            newDeaths: 0,
            deaths: 0,
            totalCases: 0
          }
        }
        countries[countryId].history[date].newCases += entry.newCases
        countries[countryId].history[date].newDeaths += entry.newDeaths
        countries[countryId].history[date].deaths = countries[countryId].deaths
        countries[countryId].history[date].totalCases =
          countries[countryId].totalCases
        if (entry.date === countries[countryId].lastDate) {
          countries[countryId].newCases += entry.newCases
          countries[countryId].newDeaths += entry.newDeaths
        }
      }
      return countries
    }, {})
}

export const actions = {
  async fetchData({ commit }) {
    const csv = await this.$axios.$get(
      'https://raw.githubusercontent.com/wcota/covid19br/master/cases-brazil-cities-time_changesOnly.csv'
    )
    try {
      const data = parse(csv, {
        columns: true
      })
      const entries = data.reduce((entries, entry) => {
        if (entry && entry.ibgeID !== '0') {
          entries.push({
            date: entry.date,
            country: entry.country.toLowerCase(),
            state: entry.state,
            city: entry.city,
            ibgeID: entry.ibgeID,
            newDeaths: autoParse(entry.newDeaths),
            deaths: autoParse(entry.deaths),
            newCases: autoParse(entry.newCases),
            totalCases: autoParse(entry.totalCases),
            deaths_per_100k_inhabitants: autoParse(
              entry.deaths_per_100k_inhabitants
            ),
            totalCases_per_100k_inhabitants: autoParse(
              entry.totalCases_per_100k_inhabitants
            ),
            deaths_by_totalCases: autoParse(entry.deaths_by_totalCases),
            _source: entry._source
          })
        }
        return entries
      }, [])
      const lastDate = entries.reduce(
        (accumulator, entry) =>
          accumulator <= entry.date ? entry.date : accumulator,
        '2020-01-01'
      )
      commit('SET_KEYS', Object.keys(data[0]))
      commit('SET_ENTRIES', entries)
      commit('SET_LAST_DATE', lastDate)
    } catch {}
  }
}
