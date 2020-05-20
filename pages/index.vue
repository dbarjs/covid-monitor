<template>
  <v-layout column justify-center>
    <header
      class="d-flex flex-column justify-space-between pt-6 pb-2"
      :style="{ height: verticalHeigth + 'px' }"
    >
      <Info v-if="brazil" :updated="brazil.updated"></Info>
      <v-container>
        <country-resume :country="brazil"></country-resume>
      </v-container>
    </header>
    <states-resume></states-resume>
  </v-layout>
</template>

<script>
import Info from '~/components/Info.vue'
import CountryResume from '~/components/CountryResume.vue'
import StatesResume from '~/components/StatesResume.vue'
export default {
  components: {
    CountryResume,
    Info,
    StatesResume
  },
  data() {
    return {
      isMobile: false,
      verticalHeigth: window.innerHeight
    }
  },
  computed: {
    brazil() {
      return this.$store.getters['countries/getCountryById']('brazil')
    }
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  created() {
    this.$store.dispatch('countries/bindCountries')
  },
  methods: {
    onResize() {
      this.verticalHeigth = window.innerHeight
      this.isMobile = window.innerWidth < 600
    }
  }
}
</script>

<style></style>
