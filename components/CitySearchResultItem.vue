<template>
  <v-list-item v-if="city" link color="grey" @click="selectCity(city.cityId)">
    <v-list-item-title>
      {{ city.name }}
    </v-list-item-title>
  </v-list-item>
</template>

<script>
export default {
  props: {
    city: {
      default: false,
      type: [Object, Boolean]
    }
  },
  methods: {
    selectCity(cityId) {
      this.$store.commit('cities/ADD_SELECTED_CITY', cityId)
    }
  }
}
</script>

<style></style>
