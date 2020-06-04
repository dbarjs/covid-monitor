<template>
  <v-layout v-if="selectedCities">
    <v-container>
      <header class="mb-2">
        <h2 class="headline font-weight-bold">Casos do vírus por cidade</h2>
        <p class="subtitle-1 grey--text text--darken-2">Casos confirmados</p>
      </header>
      <city-search></city-search>
      <v-row>
        <v-col
          v-for="(cityId, index) in selectedCities"
          :key="index"
          cols="12"
          sm="6"
          lg="4"
        >
          <city-resume :city-id="cityId"></city-resume>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import CitySearch from '~/components/CitySearch.vue'
import CityResume from '~/components/CityResume.vue'
export default {
  components: {
    CitySearch,
    CityResume
  },
  computed: {
    selectedCities() {
      const arr = [...this.$store.getters['cities/getSelectedCities']]
      return arr.reverse()
    }
  },
  created() {
    this.$store.dispatch('cities/getSelectedCitiesFromStore')
  }
}
</script>

<style></style>
