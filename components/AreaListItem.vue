<template>
  <div v-if="areaData.parentId === 'world'">
    <p>{{ areaData.displayName }}</p>
  </div>
</template>

<script>
export default {
  props: {
    areaData: {
      required: true,
      type: Object
    }
  }
}
</script>

<style></style>
