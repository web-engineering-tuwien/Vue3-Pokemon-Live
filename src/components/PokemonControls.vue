<template>
  <div class="controls">
    <LimitSelector
      v-model="limit"
      :options="[10, 20, 50, 100, 500]"
      label="Number of Pokémon:"
    />
    <SearchInput v-model="search" placeholder="Search by name" />
  </div>
</template>

<script setup>
import LimitSelector from './LimitSelector.vue'
import SearchInput from './SearchInput.vue'

const limit = defineModel('limit')
const search = defineModel('search')
</script>

<style scoped>
.controls {
  margin-bottom: 1rem;
}
</style>

