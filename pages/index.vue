<template>
  <v-layout class="full-width" column justify-center>
    <v-layout class="grey lighten-2">
      <v-container>
        <selected-cities></selected-cities>
      </v-container>
    </v-layout>
    <header
      class="heigth-100 grey lighten-3 pt-6 pb-0 d-flex flex-column justify-space-between"
    >
      <Info v-if="brazil" :updated="brazil.updated"></Info>
      <v-container>
        <country-resume :country="brazil"></country-resume>
      </v-container>
    </header>
    <states-resume class="heigth-100 py-6 px-6"></states-resume>
  </v-layout>
</template>

<script>
import Info from '~/components/Info.vue'
import CountryResume from '~/components/CountryResume.vue'
import StatesResume from '~/components/StatesResume.vue'
import SelectedCities from '~/components/SelectedCities'
export default {
  components: {
    CountryResume,
    Info,
    StatesResume,
    SelectedCities
  },
  computed: {
    brazil() {
      return this.$store.getters['countries/getCountryById']('brazil')
    }
  },
  created() {
    this.$store.dispatch('countries/bindCountries')
    this.$store.dispatch('states/bindStates')
  }
}
</script>

<style>
.heigth-100 {
  min-height: 100vh;
}
</style>
