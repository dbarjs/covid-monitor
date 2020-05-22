<template>
  <v-layout v-if="selectedCities">
    <v-container>
      <v-row no-gutters>
        <v-col
          v-for="(cityId, index) in selectedCities"
          :key="cityId"
          cols="12"
        >
          <city-resume
            :city-id="cityId"
            :class="{ 'mb-3': index !== selectedCities.length - 1 }"
          ></city-resume>
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
