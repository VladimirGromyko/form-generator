<template>
  <form class="form-generator" @submit.prevent="onSave">
    <div
      v-for="(field, idx) in fields"
      :key="field.name ?? idx"
      class="fg-row"
    >
      <label v-if="field.label" :for="field.name" class="fg-label">
        {{ field.label }}
        <span v-if="field.required" class="fg-required">*</span>
      </label>

      <slot
        :name="`field-${field.name}`"
        :field="field"
        :value="local[field.name]"
        :update="(value) => setField(field.name, value)"
      >
        <component
          :is="fieldComponents[field.type] || InputField"
          v-model="local[field.name]"
          :id="field.name"
          :name="field.name"
          :options="field.options"
          :placeholder="field.placeholder"
          :attrs="field.attrs"
          class="fg-control"
        />
      </slot>

      <div v-if="field.help" class="fg-help">{{ field.help }}</div>
    </div>

    <div class="fg-actions">
      <slot name="actions" :submit="onSubmit" :cancel="onCancel" :form="local">
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" @click="onCancel">Cancel</button>
          <button type="button" class="btn btn-primary" @click="onSubmit">Save</button>
        </div>
      </slot>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch, toRaw, defineProps, defineEmits, ref } from 'vue'

import InputField from '@/components/fields/InputField.vue';
import SelectField from '@/components/fields/SelectField.vue';
import CheckboxField from '@/components/fields/CheckboxField.vue';
import TextareaField from '@/components/fields/TextareaField.vue';

type Option = { label: string; value: any };
type Field = {
  name: string;
  label?: string;
  type?: string;
  options?: Option[];
  placeholder?: string;
  attrs?: Record<string, any>;
  help?: string;
  required?: boolean;
  value?: any;
  default?: any;
};

const props = defineProps<{
  fields: Field[];
  modelValue?: Record<string, any>;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', v: Record<string, any>): void;
  (e: 'save', payload: Record<string, any>): void;
  (e: 'cancel'): void;
}>();

const local = reactive<Record<string, any>>({});

const fieldComponents: Record<string, any> = {
  input: InputField,
  select: SelectField,
  checkbox: CheckboxField,
  textarea: TextareaField,
};

function initLocal() {
  debugger
  const src = props.modelValue || {};
  const fieldNames = new Set<string>();

  for (const field of props.fields || []) {
    if (!field || !field.name) continue;
    const name = field.name;
    fieldNames.add(name);
    if (name in src) {
      local[name] = src[name];
      // local.value[name] = src[name];
      continue;
    }
    if (field.value) {
      local[name] = field.value;
      continue;
    }
    if (field.default) {
      local[name] = field.default;
      continue;
    }

    if (field.type === 'checkbox') {
      if (Array.isArray(field.options) && field.options.length > 0) {
        local[name] = [];
      } else {
        local[name] = false;
      }
    } else if (field.type === 'select') {
      if (Array.isArray(field.options) && field.options.length > 0) {
        local[name] = field.options[0].value ?? null;
      } else {
        local[name] = null;
      }
    } else {
      local[name] = '';
    }
  }

  for (const key of Object.keys(local)) {
    if (!fieldNames.has(key) && !(key in src)) {
      delete local[key];
    }
  }
}

initLocal();

function setField(name: string, value: any) {
  local[name] = value;
}

function onSave() {
  emit('save', { ...(toRaw(local) as Record<string, any>) });
}
function onSubmit() {
  const payload = toRaw(local);
  emit('update:modelValue', { ...payload });
  emit('save', { ...payload });
}
function onCancel() {
  emit('cancel');
}

watch(
  () => props.fields,
  () => {
    initLocal();
  },
  { deep: true }
);

watch(() => props.modelValue, () => initLocal(), { deep: true });

watch(
  local,
  (nv) => {
    emit('update:modelValue', { ...(toRaw(nv) as Record<string, any>) });
  },
  { deep: true }
);
</script>

<style scoped lang='scss'>
.form-generator {
  display: flex;
  flex-direction: column;
  gap: 16px;
  .fg-row {
    display: flex;
    flex-direction: column;
    gap: 6px;
    .fg-label {
      font-weight: 600;
      font-size: 14px;
    }
    .fg-required {
      color: #d02323;
      margin-left: 6px;
    }
    .fg-help {
      font-size: 12px;
      color: #6b7280;
    }
  }
}
.fg-actions, .form-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 6px;
  //.btn-save {
  .btn-primary {
    background: #4f46e5;
    color: white;
  }
  //.btn-cancel {
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
