<script setup lang="ts">
const source = "https://github.com/branislavjuhaas/dn-cascade";
</script>

<template>
  <USeparator />
  <UFooter>
    <template #left>
      <p class="text-muted text-sm">Copyright © 2025 Branislav Juhás</p>
    </template>

    <template #right>
      <UColorModeButton />
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
