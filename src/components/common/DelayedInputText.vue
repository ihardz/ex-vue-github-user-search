<template>
  <div class="delayed-input-text-component p-input-icon-right">
    <i class="pi pi-clock" v-if="waiting" />
    <InputText :modelValue="currentValue" @input="handleInput" :placeholder="placeholder" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const EVENT_UPDATE_MODEL = 'update:modelValue';

export default defineComponent({
  emits: [
    EVENT_UPDATE_MODEL
  ],
  props: {
    modelValue: {
      type: String,
      default: undefined
    },
    delaySeconds: {
      type: Number,
      default: 0.5
    },
    allowWhiteSpace: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: undefined
    }
  },
  data(): {
    delayTimeoutId?: number
  } {
    return {
      delayTimeoutId: undefined
    }
  },
  computed: {
    currentValue(): string | undefined {
      return this.modelValue
    },
    waiting(): boolean {
      return !isNaN(this.delayTimeoutId as number);
    },
    _delayMs(): number {
      return this.delaySeconds * 1000;
    }
  },
  methods: {
    handleInput(event: any): void {
      const value = event?.target?.value;
      const valueNormalized = this._normalizeValue(value);
      this._rescheduleDelayedUpdate(valueNormalized);
    },
    _normalizeValue(value: string | undefined): string | undefined {
      const normalized = this.allowWhiteSpace ? value?.trimStart(): value;
      return normalized || undefined;
    },
    _rescheduleDelayedUpdate(value?: string): void {
      this._resetDelayedUpdate();
      const delegate = this._emitUpdate.bind(this, value);
      this.delayTimeoutId = setTimeout(delegate, this._delayMs);
    },
    _resetDelayedUpdate(): void {        
      clearTimeout(this.delayTimeoutId);
      this.delayTimeoutId = undefined;
    },
    _emitUpdate(value?: string): void {
      this.$emit(EVENT_UPDATE_MODEL, value);
      this._resetDelayedUpdate();
    }
  }
})
</script>