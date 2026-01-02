<template>
  <div>
    <div v-if="hasOptions" class="fg-checkbox-group">
      <label
        v-for="(option, ind) in options"
        :key="ind"
        class="fg-checkbox-label"
      >
        <input
          type="checkbox"
          :value="option.value"
          :checked="isChecked(option.value)"
          @change="onGroupChange($event, option.value)"
        />
        <span class="lbl">{{ option.label }}</span>
      </label>
    </div>

    <label v-else class="fg-checkbox-single">
      <input
        type="checkbox"
        :checked="!!modelValue"
        @change="onSingleChange"
      />
      <span class="lbl"><slot>Checkbox</slot></span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

type Option = { label: string; value: any };

const props = defineProps<{
  modelValue?: any;
  options?: Option[];
  attrs?: Record<string, any>;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
}>();

const options = props.options ?? [];
const hasOptions = computed(() => Array.isArray(options) && options.length > 0);

function isChecked(value: any) {
  const vals = Array.isArray(props.modelValue) ? props.modelValue : [];
  return vals.includes(value);
}

function onGroupChange(e: Event, value: any) {
  const checked = (e.target as HTMLInputElement).checked;
  const current = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
  if (checked) {
    if (!current.includes(value)) current.push(value);
  } else {
    const idx = current.indexOf(value);
    if (idx !== -1) current.splice(idx, 1);
  }
  emit('update:modelValue', current);
}

function onSingleChange(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).checked);
}
</script>

<style scoped>
.fg-checkbox-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.fg-checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.fg-checkbox-single {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.lbl {
  user-select: none;
  color: #111827;
}
</style>
