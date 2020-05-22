<template>
  <v-card v-if="city">
    <v-card-title>{{ city.city }}</v-card-title>
    <v-card-subtitle>
      Casos: {{ city.totalCases }} Mortes: {{ city.deaths }}
    </v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon color="red" @click="removeCity">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { citiesRef } from '~/firebase'
export default {
  props: {
    cityId: {
      default: false,
      type: [Boolean, String]
    },
    last: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      city: false
    }
  },
  watch: {
    cityId: {
      immediate: true,
      handler(cityId) {
        if (cityId) {
          this.$bind('city', citiesRef.doc(cityId))
        }
      }
    }
  },
  methods: {
    removeCity() {
      this.$store.commit('cities/REMOVE_SELECTED_CITY', this.city.cityId)
    }
  }
}
</script>

<style></style>
