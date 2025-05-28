module.exports = {
  extends: [
    'plugin:vue/vue3-recommended',
    // ...
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    // Allow v-model with arguments
    'vue/no-v-model-argument': 'off'
  }
}
