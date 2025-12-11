<script setup lang="ts">
const props = defineProps<{
  countsOfSubjects: Record<string, number>;
}>();

const emit = defineEmits<{ (e: "edit"): void }>();

const badgeColor = (count: number) => {
  if (count >= 30) return "error";
  if (count >= 18) return "warning";
  if (count >= 10) return "info";
  return "success";
};
</script>

<template>
  <UCard variant="subtle" class="sm:col-span-2">
    <template v-if="Object.keys(props.countsOfSubjects).length > 0">
      <div class="flex flex-row items-center justify-center gap-2 flex-wrap">
        <UBadge
          v-for="subject in Object.keys(props.countsOfSubjects).sort(
            (a, b) =>
              (props.countsOfSubjects[b] ?? 0) -
              (props.countsOfSubjects[a] ?? 0),
          )"
          :key="subject"
          :color="badgeColor(props.countsOfSubjects[subject] ?? 0)"
          variant="subtle">
          <b>{{ subject.replace(/[0-9]/g, "") }}</b>
          {{ (props.countsOfSubjects[subject] ?? 0) * 2 }}
        </UBadge>
        <UButton
          variant="subtle"
          icon="ph:projector-screen-chart"
          size="xs"
          @click="emit('edit')">
          <b>EDIT</b>
        </UButton>
      </div>
    </template>
    <template v-else>
      <p class="text-center text-sm text-dimmed">No subjects set yet</p>
      <UButton
        block
        variant="subtle"
        icon="ph:projector-screen-chart"
        class="mt-4"
        @click="emit('edit')">
        Set Subjects
      </UButton>
    </template>
  </UCard>
</template>
