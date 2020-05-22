<template>
  <article v-if="states.length">
    <v-container>
      <header class="mb-2">
        <h2 class="headline font-weight-bold">Casos do vírus por estado</h2>
        <p class="subtitle-1 grey--text text--darken-2">Casos confirmados</p>
      </header>
      <div v-for="(state, index) in states" :key="index">
        <div class="d-flex justify-space-between align-center py-3">
          <span class="font-mono caption font-weight-medium state-code mr-3">
            {{ state.state }}
          </span>
          <div class="flex-grow-1">
            <div class="bar full-width">
              <div
                class="bar-fill red accent-4 d-flex align-center fill-height justify-space-around"
                :style="{ width: percentage(state.totalCases) + '%' }"
              >
                <span
                  class="flex-grow-1 font-mono caption font-weight-medium white--text text-right pr-2"
                >
                  {{ state.totalCases | number }}
                </span>
              </div>
            </div>
          </div>
          <span
            class="state-total text-right font-mono caption font-weight-medium ml-2"
          >
            <span v-if="state.newCases > 0" class="red--text text--lighten-1"
              >+{{ state.newCases | number }}</span
            >
            <span v-else class="green--text text--lighten-1">0</span>
          </span>
        </div>
        <v-divider v-if="index < states.length - 1"></v-divider>
      </div>
    </v-container>
  </article>
</template>

<script>
export default {
  computed: {
    states() {
      try {
        return this.$store.getters['states/getStates']
      } catch {
        return []
      }
    },
    max() {
      // max totalCases from states
      return this.states.reduce(
        (max, { totalCases }) => (max < totalCases ? totalCases : max),
        0
      )
    },
    total() {
      return this.states.reduce(
        (total, { totalCases }) => total + totalCases,
        0
      )
    }
  },
  methods: {
    percentage(n) {
      try {
        const avg =
          [...this.states]
            .splice(0, 5)
            .reduce((total, { totalCases }) => total + totalCases, 0) / 5
        return (n / avg) * 100
      } catch {
        return 0
      }
    }
  }
}
</script>

<style>
.bar {
  border-radius: 4px;
  height: 30px;
  position: relative;
  overflow: hidden;
}
.bar-fill {
  border-radius: inherit;
  min-width: 48px;
  max-width: 100%;
}
.state-total {
  min-width: 44px;
}
</style>
