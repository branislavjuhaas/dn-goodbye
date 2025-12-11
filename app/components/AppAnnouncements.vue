<script setup lang="ts">
const today = new Date();
const announcements = useAnnouncements(today);
</script>

<template>
  <UBanner
    v-for="announcement in announcements"
    :key="announcement"
    icon="ph:confetti-fill"
    color="warning"
    :title="announcement"
    class="fixed" />
</template>
