<template>
  <div class="text-left full-width text-center">
    <v-container class="pb-0">
      <h1 class="display-2 green--text font-weight-black pb-0">
        Covid-19
      </h1>
      <p class="display-1 font-weight-medium mb-0">
        Monitoramento de Dados do Brasil
      </p>
      <p class="caption grey--text text--lighten-1 font-mono mb-0">
        Atualização: {{ updateDate }}
      </p>
    </v-container>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
export default {
  props: {
    updated: {
      default: false,
      type: [Object, Boolean]
    }
  },
  computed: {
    updateDate() {
      return DateTime.fromSeconds(this.updated.seconds).toLocaleString(
        DateTime.DATETIME_SHORT
      )
    }
  }
}
</script>

<style></style>
