<script setup lang="ts">
/**
 * Props:
 * - timetable: initial array of selected subject-group strings (e.g. ["MAT1", "BIO6"])
 */
const props = defineProps<{
  timetable: string[];
}>();

/**
 * Emits:
 * - close: emitted with the selected timetable (string[]) when modal closes
 */
const emit = defineEmits<{
  close: (timetable: string[]) => void;
}>();

/**
 * items: available choices for the checkbox group (populated from useTimetable helper)
 * value: reactive selection bound to the checkbox group
 */
const items = ref(useTimetable());
const value = ref(props.timetable ?? []);
</script>

<template>
  <UModal
    :close="{ onClick: () => emit('close', props.timetable) }"
    title="Select Your Subjects">
    <template #body>
      <UCheckboxGroup v-model="value" :items="items" variant="table" />
    </template>
    <template #footer>
      <div class="flex flex-row items-center justify-between w-full gap-2">
        <p class="text-sm text-dimmed">{{ value.length }} subjects selected</p>
        <UButton @click="emit('close', value)">Save Subjects</UButton>
      </div>
    </template>
  </UModal>
</template>
