<script setup lang="ts">
const source = "https://github.com/branislavjuhaas/dn-cascade";
const website = "https://juhaas.eu";
</script>

<template>
  <USeparator />
  <UFooter>
    <template #left>
      <p class="text-muted text-sm">Copyright © 2025 Branislav Juhás</p>
    </template>

    <template #right>
      <UButton
        icon="ph:globe-hemisphere-west"
        color="neutral"
        variant="ghost"
        :to="website"
        target="_blank"
        aria-label="Website" />
      <UButton
        icon="ph:github-logo"
        color="neutral"
        variant="ghost"
        :to="source"
        target="_blank"
        aria-label="GitHub" />
    </template>
  </UFooter>
</template>
