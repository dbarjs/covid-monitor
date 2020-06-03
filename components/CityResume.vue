<template>
  <v-card v-if="city" flat link @click="openView">
    <v-card-title>{{ city.city }}</v-card-title>
    <v-card-subtitle class="font-mono">
      Casos: {{ city.totalCases | number }} <br />
      Óbitos: {{ city.deaths | number }}
    </v-card-subtitle>
    <v-container>
      <v-sparkline
        auto-draw
        line-width="2"
        :value="newCases"
        :gradient="['#f72047', '#ffd200', '#1feaea']"
        smooth="8"
        padding="16"
      ></v-sparkline>
      <p class="caption text-center grey--text text--lighten-1">
        Evolução de novos casos (por dia)
      </p>
    </v-container>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon color="red accent-4" @click="removeCity">
        <v-icon>mdi-delete-outline</v-icon>
      </v-btn>
    </v-card-actions>
    <region-view
      ref="cityView"
      :title="city.city"
      :entries="entries"
    ></region-view>
  </v-card>
</template>

<script>
import { DateTime } from 'luxon'
import { citiesRef } from '~/firebase'
import RegionView from '~/components/RegionView.vue'
export default {
  components: {
    RegionView
  },
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
  computed: {
    entries() {
      try {
        const dates = this.getDates(
          DateTime.fromISO('2020-02-25'),
          DateTime.local()
        )
        const entries = Object.values(this.city.entries)
        let lastEntry = {}
        return dates.map((date) => {
          const index = entries.findIndex((entry) => entry.date === date)
          if (index > -1) {
            lastEntry = entries[index]
            return lastEntry
          } else {
            return {
              ...lastEntry,
              date,
              newCases: 0,
              newDeaths: 0
            }
          }
        })
      } catch {
        return []
      }
    },
    newCases() {
      try {
        return this.city ? this.entries.map((entry) => entry.newCases) : []
      } catch {
        return [1]
      }
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
      this.$store.commit('cities/REMOVE_SELECTED_CITY', this.cityId)
    },
    getDates(firstDay, today) {
      let current = firstDay
      const dates = []
      while (current <= today) {
        dates.push(current.toISODate())
        current = current.plus({ days: 1 })
      }
      return dates
    },
    openView() {
      this.$refs.cityView.show()
    }
  }
}
</script>

<style></style>
