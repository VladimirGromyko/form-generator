<template>
  <select
    :id='id'
    :name='name'
    class='fg-select'
    v-bind='attrs'
    :value="modelValue ?? ''"
    @change='onChange'
  >
    <option value=''>-- Select --</option>
    <option
      v-for='(option, ind) in options'
      :key='ind'
      :value='stringifyValue(option.value)'
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script setup lang='ts'>
import { defineProps, defineEmits } from 'vue'

type Option = { label: string; value: any };
type Attrs = Record<string, any>;

const props = defineProps<{
  modelValue?: any;
  id?: string;
  name?: string;
  options?: Option[];
  attrs?: Attrs;
}>()


const emit = defineEmits<{ (e: 'update:modelValue', value: any): void }>()

function stringifyValue(value: any): string {
  if (value === null || value === undefined) return ''
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }
  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}

function parseValue(str: string) {
  debugger
  if (str === '') return null
  if ((str.startsWith('{') && str.endsWith('}')) || (str.startsWith('[') && str.endsWith(']'))) {
    try {
      return JSON.parse(str)
    } catch {
    }
  }
  if (!isNaN(Number(str))) {
    return Number(str)
  }
  if (str === 'true') return true
  if (str === 'false') return false
  return str
}

function onChange(e: Event) {
  const v = (e.target as HTMLSelectElement).value
  emit('update:modelValue', parseValue(v))
}
</script>

<style scoped lang='scss'>
.fg-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background: white;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.06);
  }
}
</style>
