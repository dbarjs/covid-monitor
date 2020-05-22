<template>
  <v-layout v-if="selectedCities">
    <v-container>
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
import CityResume from '~/components/CityResume.vue'
export default {
  components: {
    CityResume
  },
  computed: {
    selectedCities() {
      return this.$store.getters['cities/getSelectedCities']
    }
  },
  created() {
    this.$store.dispatch('cities/getSelectedCitiesFromStore')
  }
}
</script>

<style></style>
