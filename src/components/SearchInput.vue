<template>
  <input
    type="text"
    :placeholder="placeholder"
    v-model="internalValue"
    class="search-box"
  />
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Search...',
  },
})

const emit = defineEmits(['update:modelValue'])

const internalValue = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  if (newVal !== internalValue.value) {
    internalValue.value = newVal
  }
})

watch(internalValue, (val) => {
  emit('update:modelValue', val)
})
</script>

<style scoped>
.search-box {
  width: 80%;
  padding: 0.5rem;
  font-size: 1rem;
  margin-top: 0.5rem;
}
</style>
