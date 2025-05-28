// src/stores/pokemonStore.js
import { defineStore } from 'pinia'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemonList: [], // { name, url }
    selectedPokemonDetails: null,
    loading: false,
  }),

  actions: {
    async fetchPokemonList(limit = 151) {
      this.loading = true
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
        const data = await res.json()
        this.pokemonList = data.results // includes name + url
      } finally {
        this.loading = false
      }
    }
  }
})
