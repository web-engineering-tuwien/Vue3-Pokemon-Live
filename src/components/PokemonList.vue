<template>
  <div class="container">
    <!-- Left side: Controls + List -->
    <div class="list">
      <h2>Pokémon List</h2>

      <PokemonControls
        v-model:limit="pokemonLimit"
        v-model:search="search"
      />

      <PokemonListDisplay
        :pokemon="filteredList"
        :selectedName="selectedPokemonDetails?.name"
        @select="loadPokemonDetails"
      />
    </div>

    <!-- Right side: Details -->
    <div class="details">
      <PokemonDetails
        v-if="selectedPokemonDetails"
        :pokemon="selectedPokemonDetails"
        :key="selectedPokemonDetails.name"
      />
      <p v-else class="placeholder">Select a Pokémon to see abilities.</p>
    </div>

    <p v-if="loading" class="loading-indicator">Loading...</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { usePokemonStore } from '../stores/pokemonStore'
import PokemonControls from './PokemonControls.vue'
import PokemonListDisplay from './PokemonListDisplay.vue'
import PokemonDetails from './PokemonDetails.vue'

const store = usePokemonStore()

const pokemonLimit = ref(10)
const search = ref('')
const selectedPokemonDetails = ref(null)
const loading = ref(false)

onMounted(() => {
  store.fetchPokemonList(pokemonLimit.value)
})

watch(pokemonLimit, async (newLimit) => {
  selectedPokemonDetails.value = null
  loading.value = true
  await store.fetchPokemonList(newLimit)
  loading.value = false
})

const filteredList = computed(() =>
  store.pokemonList.filter(p =>
    p.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

async function loadPokemonDetails(pokemon) {
  loading.value = true
  try {
    const res = await fetch(pokemon.url)
    const data = await res.json()
    selectedPokemonDetails.value = {
      name: pokemon.name,
      abilities: data.abilities.map(a => a.ability.name),
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 2rem auto;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  height: calc(100vh - 4rem);
  box-sizing: border-box;
}

.list {
  width: 40%;
  max-width: 300px;
  border-right: 1px solid var(--color-border);
  padding-right: 1rem;
  overflow-y: auto;
}

.details {
  width: 60%;
  padding-left: 1rem;
  overflow-y: auto;
}

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

.placeholder {
  color: var(--color-muted);
  font-style: italic;
  margin-top: 1rem;
}

.loading-indicator {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  font-style: italic;
  font-size: 0.9rem;
  color: var(--color-muted);
}

/* Optional responsiveness */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    height: auto;
    padding: 1rem;
  }

  .list,
  .details {
    width: 100%;
    max-width: none;
    padding: 0;
    border-right: none;
  }

  .list {
    margin-bottom: 1rem;
  }
}
</style>