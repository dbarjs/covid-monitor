<template>
  <div v-if="data">
    <h2>COVID-19 Monitor</h2>
    <global-data></global-data>
    <area-list></area-list>
  </div>
</template>

<script>
import AreaList from '~/components/AreaList.vue'
import GlobalData from '~/components/GlobalData.vue'
export default {
  components: {
    AreaList,
    GlobalData
  },
  computed: {
    data() {
      return this.$store.getters.getData
    }
  }
}
</script>

<style></style>
