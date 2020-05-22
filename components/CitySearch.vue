<template>
  <v-layout column>
    <v-container>
      <v-text-field
        v-model="cityQuery"
        solo
        hide-details
        label="Pesquise uma cidade"
        autocomplete="off"
      ></v-text-field>
      <v-list v-if="cityQuery.length" color="transparent">
        <city-search-result-item
          v-for="(city, index) in queryResult"
          :key="index"
          :city="city.item"
        ></city-search-result-item>
      </v-list>
    </v-container>
  </v-layout>
</template>

<script>
import Fuse from 'fuse.js'
import CitySearchResultItem from '~/components/CitySearchResultItem.vue'
export default {
  components: {
    CitySearchResultItem
  },
  data() {
    return {
      cityQuery: ''
    }
  },
  computed: {
    selectedCities() {
      return this.$store.getters['cities/getSelectedCities']
    },
    cities() {
      return this.$store.getters['states/getCities']
    },
    cityNames() {
      return new Fuse(this.cities, {
        keys: ['name'],
        threshold: 0.25
      })
    },
    queryResult() {
      return this.cityNames.search(this.cityQuery, { limit: 8 })
    }
  },
  watch: {
    selectedCities: {
      immediate: true,
      handler(current, old) {
        try {
          if (this.cityQuery) {
            this.cityQuery = ''
          }
        } catch {}
      }
    }
  }
}
</script>

<style></style>
