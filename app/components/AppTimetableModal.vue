<script setup lang="ts">
const props = defineProps<{
  timetable: string[];
}>();

const emit = defineEmits<{
  close: (timetable: string[]) => void;
}>();

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
