<template>
  <v-dialog
    v-if="isOpen"
    v-model="isOpen"
    transition="scale-transition"
    fullscreen
  >
    <v-card color="white">
      <v-toolbar color="transparent" flat>
        <v-btn icon @click="hide"><v-icon>mdi-close</v-icon></v-btn>
        <v-toolbar-title v-if="title">{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-container>
        <div class="chart-container">
          <canvas ref="casesChart" class="chart-canvas" height="400"></canvas>
        </div>
        <p class="caption text-center grey--text text--lighten-1 mt-3">
          Evoução de casos e óbitos (acumulado)
        </p>
        <div class="chart-container">
          <canvas ref="deathsChart" class="chart-canvas" height="400"></canvas>
        </div>
        <p class="caption text-center grey--text text--lighten-1 mt-3">
          Evoução de casos e óbitos (acumulado)
        </p>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import Chart from 'chart.js'
import { DateTime } from 'luxon'
export default {
  props: {
    title: {
      default: '',
      type: String
    },
    entries: {
      default: false,
      type: [Boolean, Array]
    }
  },
  data() {
    return {
      isOpen: false,
      chart: false
    }
  },
  computed: {
    totalCases() {
      return this.entries
        ? this.entries.map((entry) => entry.totalCases || 0)
        : []
    },
    dates() {
      return this.entries ? this.entries.map((entry) => entry.date) : []
    },
    deaths() {
      return this.entries ? this.entries.map((entry) => entry.deaths || 0) : []
    },
    newDeaths() {
      return this.entries
        ? this.entries.map((entry) => entry.newDeaths || 0)
        : []
    },
    newCases() {
      return this.entries
        ? this.entries.map((entry) => entry.newCases || 0)
        : []
    }
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (isOpen && this.totalCases?.length) {
          try {
            setTimeout(() => {
              this.buildChart()
            }, 500)
          } catch (e) {
            // eslint-disable-next-line
            console.error(e)
          }
        }
      }
    }
  },
  methods: {
    show() {
      this.isOpen = true
    },
    hide() {
      this.isOpen = false
    },
    buildChart() {
      const fontFamily = '"Roboto Mono", monospace'
      const datasetsOptions = {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        pointBorderWidth: 0
      }
      const options = {
        defaultFontFamily: fontFamily,
        tooltips: {
          enabled: true,
          mode: 'index',
          axis: 'y',
          titleFontFamily: fontFamily,
          bodyFontFamily: fontFamily,
          footerFontFamily: fontFamily
        },
        legend: {
          display: true,
          fontFamily,
          position: 'bottom'
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                color: 'rgba(0, 0, 0, 0.0)'
              },
              ticks: {
                // Include a dollar sign in the ticks
                callback(value, index, values) {
                  try {
                    return DateTime.fromISO(value)
                      .setLocale('pt-br')
                      .toLocaleString({
                        month: 'short',
                        day: 'numeric'
                      })
                  } catch {
                    return value
                  }
                },
                fontFamily
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                callback(value, index, values) {
                  try {
                    return value > 999 ? value / 1000 + ' mil' : value
                  } catch {
                    return ''
                  }
                },
                maxTicksLimit: 10,
                fontFamily
              }
            }
          ]
        }
      }
      this.casesChart = new Chart(this.$refs.casesChart, {
        type: 'line',
        data: {
          labels: this.dates,
          datasets: [
            {
              ...datasetsOptions,
              label: 'Casos (acumulados)',
              data: this.totalCases,
              pointBackgroundColor: 'rgba(183, 28, 28, 1.0)'
            },
            {
              ...datasetsOptions,
              label: 'Novos casos',
              data: this.newCases,
              borderColor: 'rgba(213, 0, 0, 1.0)',
              pointBorderColor: 'transparent',
              lineTension: 0.6,
              borderWidth: 2
            }
          ]
        },
        options
      })

      this.deathsChart = new Chart(this.$refs.deathsChart, {
        type: 'line',
        data: {
          labels: this.dates,
          datasets: [
            {
              ...datasetsOptions,
              label: 'Óbitos (acumulados)',
              data: this.deaths,
              pointBackgroundColor: 'rgba(74, 20, 140, 1.0)'
            },
            {
              ...datasetsOptions,
              label: 'Novos óbitos',
              data: this.newDeaths,
              borderColor: 'rgba(170, 0, 255, 1.0)',
              pointBorderColor: 'transparent',
              lineTension: 0.6,
              borderWidth: 2
            }
          ]
        },
        options
      })
    }
  }
}
</script>

<style>
.chart-container {
  margin: 0 auto;
  max-width: 768px;
  position: relative;
}

.chart-canvas {
  width: 100%;
}
</style>
