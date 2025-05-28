<template>
  <div v-if="pokemon">
    <h3>Details for {{ pokemon.name }}</h3>
    <ul>
      <li v-for="ability in pokemon.abilities" :key="ability">
        {{ ability }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
})
</script>
