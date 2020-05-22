<template>
  <v-layout column justify-center align-center>
    <v-btn @click="fetch">Fetch from Source</v-btn>
    <div v-if="entries.length" class="log my-3">
      <p>Última data: {{ lastDate }}</p>
      <p>Casos: {{ totalCases }}</p>
      <p>Fetched {{ entries.length }} rows</p>
      <p>Fetched {{ Object.keys(cities).length }} new cities</p>
      <p>Keys: {{ keys }}</p>
      <p v-for="(city, index) in cities" :key="index">
        {{ city.ibgeID }} - {{ city.city }} - {{ city.newCases }}
      </p>
    </div>
    <div v-if="entries.length">
      <v-btn color="orange" @click="updateCities">
        Update {{ Object.keys(cities).length }} Cities
      </v-btn>
      <v-btn color="orange" @click="updateAllCities">
        Update Cities
      </v-btn>
      <v-btn color="orange" @click="updateStates">
        Update States
      </v-btn>
      <v-btn color="orange" @click="updateCountries">
        Update Countries
      </v-btn>
    </div>
  </v-layout>
</template>

<script>
export default {
  computed: {
    keys() {
      return this.$store.getters.getKeys
    },
    lastDate() {
      return this.$store.getters['config/getLastDate']
    },
    entries() {
      return this.$store.getters['fetch/getEntries']()
    },
    cities() {
      return this.$store.getters['fetch/getCities'](this.lastDate.cities)
    },
    states() {
      return this.$store.getters['fetch/getStates']
    },
    countries() {
      return this.$store.getters['fetch/getCountries']
    },
    totalCases() {
      return Object.values(this.entries).reduce(
        (accumulator, current) =>
          current ? (accumulator += current.newCases) : accumulator,
        0
      )
    }
  },
  methods: {
    fetch() {
      this.$store.dispatch('fetch/fetchData')
    },
    updateCities() {
      this.$store.dispatch('cities/updateCities')
    },
    updateAllCities() {
      this.$store.dispatch('cities/updateCities', true)
    },
    updateStates() {
      this.$store.dispatch('states/updateStates')
    },
    updateCountries() {
      this.$store.dispatch('countries/updateCountries')
    }
  }
}
</script>

<style>
.log {
  font-family: 'Roboto Mono', monospace;
  font-size: 10px;
  background-color: #000;
  color: #fff;
  padding: 1px 1rem;
  overflow-x: hidden;
  overflow-y: auto;
  height: 400px;
  width: 100%;
}
</style>
