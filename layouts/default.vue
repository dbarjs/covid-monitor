<template>
  <v-app>
    <v-content>
      <v-container class="py-0">
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      app
      absolute
      height="96"
      color="transparent"
      class="d-flex align-center align-content-center justify-center"
    >
      <v-btn
        icon
        color="black"
        x-large
        href="https://github.com/dbarjs/covid-monitor"
        target="_blank"
      >
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Fetch',
          to: '/fetch'
        }
      ],
      miniVariant: false,
      title: 'CovidBR'
    }
  },
  created() {
    this.$store.dispatch('config/bindConfig')
  }
}
</script>

<style>
.v-application p.font-mono,
.v-application span.font-mono {
  font-family: 'Roboto Mono', monospace !important;
  letter-spacing: -1px !important;
}

.v-application .font-mono.font-dense {
  letter-spacing: -3px !important;
}

.v-application.theme--light {
  background-color: #fafafa;
}
</style>
