<template>
  <v-layout column justify-center align-center> </v-layout>
</template>

<script>
export default {
  filters: {
    keys: (value) => Object.keys(value)
  },
  computed: {
    data() {
      return this.$store.getters.getData
    },
    cities() {
      return this.$store.getters.getCities
    },
    states() {
      return this.$store.getters.getStates
    }
  },
  methods: {
    fetch() {
      this.$store.dispatch('fetchData')
    },
    updateCities() {
      this.$store.dispatch('cities/updateCities')
    },
    updateStates() {
      this.$store.dispatch('states/updateStates')
    }
  }
}
</script>
