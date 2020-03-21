<template>
  <div>
    <covid-monitor></covid-monitor>
  </div>
</template>

<script>
import CovidMonitor from '~/components/CovidMonitor.vue'
export default {
  components: {
    CovidMonitor
  },
  computed: {
    data() {
      return this.$store.getters.getData
    }
  }
}
</script>
