<template>
  <div v-if="globalData">
    <h3>{{ globalData.displayName }}</h3>
    <p>{{ globalData.totalConfirmed }} infectados</p>
    <p>{{ globalData.totalDeaths }} mortes</p>
    <p>{{ globalData.totalRecovered }} recuperados</p>
  </div>
</template>

<script>
export default {
  computed: {
    globalData() {
      return this.$store.getters.getData
    }
  }
}
</script>

<style></style>
