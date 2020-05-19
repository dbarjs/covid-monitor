<template>
  <v-layout column justify-center align-center>
    <v-btn @click="fetch">Fetch from Source</v-btn>
    <div v-if="entries.length">
      <p>Última data: {{ lastDate }}</p>
      <p>Casos: {{ totalCases }}</p>
      <p>Fetched {{ entries.length }} rows</p>
      <p>Fetched {{ Object.keys(cities).length }} new cities</p>
      <p>Keys: {{ keys }}</p>
      <v-btn color="orange" @click="updateCities">
        Save {{ Object.keys(cities).length }} Cities to Firestore
      </v-btn>
      <v-btn color="orange" @click="updateAllCities">
        Save All Cities to Firestore
      </v-btn>
      <v-btn color="orange" @click="updateStates">
        Save All States to Firestore
      </v-btn>
      <v-btn color="orange" @click="updateCountries">
        Save Countries to Firestore
      </v-btn>
      <p v-for="(city, index) in cities" :key="index">
        {{ city.ibgeID }} - {{ city.city }} - {{ city.newCases }}
      </p>
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
      return this.$store.getters.getEntries()
    },
    cities() {
      return this.$store.getters.getCities(this.lastDate.cities)
    },
    states() {
      return this.$store.getters.getStates
    },
    countries() {
      return this.$store.getters.getCountries
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
      this.$store.dispatch('fetchData')
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
