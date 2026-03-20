<script setup lang="ts">
defineProps<{
  display: number;
  progressBarValue: number;
  nameDay: string;
}>();

const { t } = useI18n();
</script>

<template>
  <div class="items-center">
    <p class="text-base font-semibold text-primary text-center">
      {{ t("hero.greeting") }}
    </p>
    <h1
      class="mt-2 text-4xl sm:text-5xl font-bold text-highlighted text-center text-balance">
      {{ display }} {{ t("hero.days") }}
    </h1>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
      <UCard variant="subtle">
        <UProgress :model-value="progressBarValue" status />
        <p class="truncate w-full mt-1 text-end text-sm text-primary">
          {{ t("hero.studyProgress") }}
        </p>
      </UCard>
      <UCard variant="subtle">
        <p class="font-medium text-primary text-center text-xl">
          {{ nameDay }}
        </p>
        <p class="text-sm text-dimmed">{{ t("hero.todayNameday") }}</p>
      </UCard>
      <slot />
    </div>
  </div>
</template>
