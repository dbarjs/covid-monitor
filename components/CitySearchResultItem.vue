<template>
  <v-list-item
    v-if="city"
    link
    class="grey lighten-4"
    @click="selectCity(city.cityId)"
  >
    <v-list-item-title>
      <span class="font-weight-medium">{{ city.name }}</span>
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
