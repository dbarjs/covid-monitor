<template>
  <v-card v-if="country" class="country" color="transparent" elevation="0">
    <v-container class="">
      <v-row>
        <v-col cols="12" sm="6">
          <v-card flat class="text-center py-4">
            <v-container>
              <p
                class="font-mono font-dense display-2 font-weight-bold mb-2 orange--text"
              >
                {{ country.totalCases | number }}
              </p>
              <p class="caption  text-center grey--text text--darken-1 mb-1">
                Casos
              </p>
              <v-chip
                label
                small
                color="font-mono red white--text font-weight-bold"
              >
                +{{ country.newCases | number }}
              </v-chip>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card flat class="text-center py-4">
            <v-container>
              <p
                class="font-mono font-dense display-2 font-weight-bold mb-2 purple--text"
              >
                {{ country.deaths | number }}
              </p>
              <p class="caption text-center grey--text text--darken-1 mb-1">
                Óbitos
              </p>
              <v-chip
                label
                small
                color="font-mono red white--text font-weight-bold"
              >
                +{{ country.newDeaths | number }}
              </v-chip>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <!-- <v-sparkline
        :value="newCases"
        :gradient="['#f72047', '#ffd200', '#1feaea']"
        height="200px"
        smooth="16"
      ></v-sparkline>
      <p class="caption text-center">Novos Casos (por dia)</p>
      <v-sparkline
        :value="newDeaths"
        :gradient="['#f72047', '#ffd200', '#1feaea']"
        height="200px"
        smooth="16"
      ></v-sparkline>
      <p class="caption text-center">Novos Óbitos (por dia)</p>
      <v-sparkline
        :value="totalCases"
        :gradient="['#f72047', '#ffd200', '#1feaea']"
        height="200px"
        smooth="16"
      ></v-sparkline>
      <p class="caption text-center">Casos acumulados</p>
      <v-sparkline
        :value="deaths"
        :gradient="['#f72047', '#ffd200', '#1feaea']"
        height="200px"
        smooth="16"
      ></v-sparkline>
      <p class="caption text-center">Óbitos acumulados</p> -->
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    country: {
      default: false,
      type: [Object, Boolean]
    }
  },
  computed: {
    history() {
      return Object.keys(this.country.history)
        .map((date) => ({
          ...this.country.history[date],
          date
        }))
        .sort((entryA, entryB) => {
          if (entryA.date > entryB.date) {
            return 1
          }
          if (entryB.date > entryA.date) {
            return -1
          }
          return 0
        })
    },
    newCases() {
      return this.history.map((entry) => entry.newCases)
    },
    newDeaths() {
      return this.history.map((entry) => entry.newDeaths)
    },
    totalCases() {
      return this.history.map((entry) => entry.totalCases)
    },
    deaths() {
      return this.history.map((entry) => entry.deaths)
    }
  }
}
</script>

<style></style>
