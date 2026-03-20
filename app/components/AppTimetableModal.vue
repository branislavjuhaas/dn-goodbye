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
const { t } = useI18n();
</script>

<template>
  <UModal
    :close="{ onClick: () => emit('close', props.timetable) }"
    :title="t('modal.selectYourSubjects')">
    <template #body>
      <UCheckboxGroup v-model="value" :items="items" variant="table" />
    </template>
    <template #footer>
      <div class="flex flex-row items-center justify-between w-full gap-2">
        <p class="text-sm text-dimmed">{{ t("modal.subjectsSelected", { count: value.length }) }}</p>
        <UButton @click="emit('close', value)">{{ t("modal.saveSubjects") }}</UButton>
      </div>
    </template>
  </UModal>
</template>
