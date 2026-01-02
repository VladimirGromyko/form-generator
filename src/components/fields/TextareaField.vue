<template>
  <textarea
    :id="id"
    :name="name"
    class="fg-textarea"
    :placeholder="placeholder"
    v-bind="attrs"
    :value="modelValue"
    @input="onInput"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

type Attrs = Record<string, any>;

const props = defineProps<{
  modelValue?: string | null;
  id?: string;
  name?: string;
  placeholder?: string;
  attrs?: Attrs;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void;
}>();

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLTextAreaElement).value);
}
</script>

<style scoped>
.fg-textarea {
  width: 100%;
  min-height: 100px;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  outline: none;
}
.fg-textarea:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99,102,241,0.06);
}
</style>
