<template>
  <div>
    <h2>Simple Demo</h2>
    <FormGenerator
      :fields='fields'
      v-model='form'
      @save='handleSave'
      @cancel='handleCancel'
    />
    <div class='preview'>
      <h3>Current model (v-model):</h3>

      {{ form }}
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import FormGenerator from '@/components/FormGenerator.vue'
import { useStore } from 'vuex'

const store = useStore()
const fields = [
  { name: 'firstName', label: 'First Name', type: 'input', placeholder: 'Enter your first name' },
  {
    name: 'email',
    label: 'Email',
    type: 'input',
    attrs: { type: 'email' },
    placeholder: 'you@example.com'
  },
  { name: 'about', label: 'About', type: 'textarea', placeholder: 'Tell us something...' }
]
const form = ref({})

function handleSave(data: any) {
  store.dispatch('saveForm', { id: Date.now(), data })
  alert('Saved (see Vuex store).')
}

function handleCancel() {
  alert('Cancelled')
}
</script>

<style scoped>
.preview {
  margin-top: 20px;
  background: #fff;
  padding: 12px;
  border-radius: 8px;
}
</style>
