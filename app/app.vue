<script setup lang="ts">
const target = new Date("2026-06-01");

const dates: { date: string; day: number }[] = (() => {
  const out: { date: string; day: number }[] = [];
  const start = new Date();
  if (start.getHours() > 15) {
    start.setDate(start.getDate() + 1);
  }

  for (let d = new Date(start); d <= target; d.setDate(d.getDate() + 1)) {
    out.push(useDay(new Date(d)));
  }

  return out;
})();

const daysRemaining = dates.filter((d) => (d as any).free === "").length;
</script>

<template>
  <div>
    <h1>Goodbye in {{ daysRemaining }} days!</h1>
  </div>
</template>
