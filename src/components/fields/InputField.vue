<template>
  <input
    :id="id"
    :name="name"
    class="fg-input"
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
  modelValue?: string | number | null;
  id?: string;
  name?: string;
  placeholder?: string;
  attrs?: Attrs;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void;
}>();

function onInput(e: Event) {
  const v = (e.target as HTMLInputElement).value;
  if (props.attrs && (props.attrs as Attrs).type === 'number') {
    const num = v === '' ? null : Number(v);
    emit('update:modelValue', Number.isNaN(num) ? null : num);
  } else {
    emit('update:modelValue', v);
  }
}
</script>

<style scoped>
.fg-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
}
.fg-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99,102,241,0.08);
}
</style>
