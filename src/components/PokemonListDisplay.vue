<template>
  <ul>
    <li
      v-for="pokemon in pokemon"
      :key="pokemon.name"
      @click="$emit('select', pokemon)"
      :class="['pokemon-name', { selected: pokemon.name === selectedName }]"
    >
      {{ pokemon.name }}
    </li>
  </ul>
</template>

<script setup>
defineProps({
  pokemon: {
    type: Array,
    required: true
  },
  selectedName: {
    type: String,
    default: null
  }
})

defineEmits(['select'])
</script>

<style scoped>
.pokemon-name {
  cursor: pointer;
  padding: 6px 0;
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-primary);
  transition: all 0.2s ease;
}

.pokemon-name:hover {
  font-weight: 600;
  color: var(--color-accent);
}

.pokemon-name.selected {
  font-weight: 700;
  color: var(--color-accent);
}
</style>
