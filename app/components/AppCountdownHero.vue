<script setup lang="ts">
defineProps<{
  display: number;
  progressBarValue: number;
  nameDay: string;
}>();
</script>

<template>
  <div class="items-center">
    <p class="text-base font-semibold text-primary text-center">
      Greetings, martyr! Your suffering will be over in
    </p>
    <h1
      class="mt-2 text-4xl sm:text-5xl font-bold text-highlighted text-center text-balance">
      {{ display }} Days
    </h1>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
      <UCard variant="subtle">
        <UProgress :model-value="progressBarValue" status />
        <p class="truncate w-full mt-1 text-end text-sm text-primary">
          Study progress
        </p>
      </UCard>
      <UCard variant="subtle">
        <p class="font-medium text-primary text-xl">
          {{ nameDay }}
        </p>
        <p class="text-sm text-dimmed">Today's nameday</p>
      </UCard>
      <slot />
    </div>
  </div>
</template>
