<template>
  <div class="limit-selector">
    <label>
      {{ label }}
      <select v-model="internalLimit" class="dropdown">
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
        <option value="custom">Custom...</option>
      </select>
    </label>

    <input
      v-if="internalLimit === 'custom'"
      type="number"
      v-model.number="customLimit"
      :min="min"
      :max="max"
      class="custom-input"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  options: {
    type: Array,
    default: () => [10, 20, 50, 100]
  },
  label: {
    type: String,
    default: 'Limit:'
  },
  min: {
    type: Number,
    default: 1
  },
  max: {
    type: Number,
    default: 1000
  },
  placeholder: {
    type: String,
    default: 'Enter custom number'
  }
})

const emit = defineEmits(['update:modelValue'])

const internalLimit = ref(props.modelValue)
const customLimit = ref(props.options.includes(props.modelValue) ? null : props.modelValue)


watch([internalLimit, customLimit], () => {
  if (internalLimit.value === 'custom') {
    emit('update:modelValue', customLimit.value)
  } else {
    emit('update:modelValue', internalLimit.value)
  }
})
</script>

<style scoped>
.limit-selector {
  margin-bottom: 1rem;
}

.dropdown {
  margin-top: 0.25rem;
  width: 80%;
  padding: 0.5rem;
  font-size: 1rem;
}

.custom-input {
  margin-top: 0.5rem;
  width: 80%;
  padding: 0.5rem;
  font-size: 1rem;
}
</style>
