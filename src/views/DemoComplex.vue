<template>
  <div>
    <h2>Complex Demo</h2>
    <FormGenerator
      :fields='fields'
      v-model='form'
      @save='handleSave'
      @cancel='handleCancel'
    >
      <template #field-avatar='{ field, value, updateValue, update }'>
        <div class='avatar-field'>
          <label class='form-label'>{{ field.label }}</label>
          <div class='avatar-preview'>
            <img v-if='value' :src='value' alt='avatar' />
            <div v-else class='avatar-placeholder'>No avatar</div>
          </div>
          <input
            type='text'
            class='input'
            :value='value'
            @input='(e) => handleInput(e, updateValue, update)'
            placeholder='URL to image'
          />
        </div>
      </template>

      <template #actions>
        <div class='form-actions'>
          <button class='btn btn-secondary' @click.prevent='handleCancel'>Reset</button>
          <button class='btn btn-primary' @click.prevent='submit'>Save</button>
        </div>
      </template>
    </FormGenerator>

    <div class='preview'>
      <h3>Current model</h3>

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
  { name: 'username', label: 'Username', required: true, type: 'input', placeholder: 'username' },
  {
    name: 'role',
    label: 'Role',
    type: 'select',
    options: [
      { label: 'User', value: 'user' },
      { label: 'Admin', value: 'admin' },
      { label: 'Guest', value: 'guest' }
    ]
  },
  {
    name: 'interests',
    label: 'Interests',
    type: 'checkbox',
    options: [
      { label: 'Music', value: 'music' },
      { label: 'Sports', value: 'sports' },
      { label: 'Movies', value: 'movies' }
    ],
    help: 'Choose one or more interests'
  },
  { name: 'avatar', label: 'Avatar URL', type: 'input', placeholder: 'https://...' },
  { name: 'bio', label: 'Bio', type: 'textarea', placeholder: 'Tell something about yourself' }
]

const initial = {
  username: '',
  role: '',
  interests: [] as string[],
  avatar: '',
  bio: ''
}

const form = ref({ ...initial })

const handleInput = (e: InputEvent, updateValue: (value) => void, update: (value) => void) => {
  const value = (e.target as HTMLInputElement).value;
  const shouldUpdate = updateValue ?? update;
  shouldUpdate?.(value);
}

function handleSave(data: any) {
  store.dispatch('saveForm', { id: Date.now(), data })
  alert('Form saved (check Vuex store).')
}

function handleCancel() {
  form.value = { ...initial }
  alert('Form reset')
}

function submit() {
  handleSave({ ...(form.value) })
}
</script>

<style scoped lang='scss'>
.preview {
  margin-top: 20px;
  background: #fff;
  padding: 12px;
  border-radius: 8px;
}

.avatar-field {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .avatar-preview {
    width: 96px;
    height: 96px;
    border-radius: 8px;
    overflow: hidden;
    background: #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 6px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .avatar-placeholder {
      color: #6b7280;
      font-size: 12px;
    }
  }
}
.form-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 6px;
  .btn-primary {
    background: #4f46e5;
    color: white;
  }
  .btn-secondary {
    background: #fff;
    color: #111827;
    border-color: #e5e7eb;
  }
}
.btn {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid transparent;
  cursor: pointer;
}
</style>
