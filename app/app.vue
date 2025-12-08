<script setup lang="ts">
const target = new Date("2026-06-01");

const dates: { date: string; position: number; free: string }[] = (() => {
  const out: { date: string; position: number; free: string }[] = [];
  const start = new Date();
  if (start.getHours() > 15) {
    start.setDate(start.getDate() + 1);
  }

  for (let d = new Date(start); d <= target; d.setDate(d.getDate() + 1)) {
    out.push(useDay(new Date(d)));
  }

  return out;
})();

const userSubjects = useCookie("subjects");

const daysRemaining = dates.filter((d) => (d as any).free === "").length;
const studyProgress = ((950 - daysRemaining) / 950) * 100;
const nameDay = useNameday(new Date());
</script>

<template>
  <UApp>
    <UMain class="flex flex-col justify-center">
      <UPage>
        <UContainer>
          <UPageBody>
            <div class="items-center mt-48">
              <p class="text-base font-semibold text-primary text-center">
                Greetings, martyr! Your sufferance will be over in
              </p>
              <h1
                class="mt-2 text-4xl sm:text-5xl font-bold text-highlighted text-center text-balance">
                {{ daysRemaining }} Days
              </h1>
              <div class="grid grid-cols-3 gap-4 mt-12 max-w-[800px] mx-auto">
                <UCard variant="subtle">
                  <UProgress v-model="studyProgress" status />
                  <p class="truncate text-end mt-2 text-sm text-primary">
                    Study Progres
                  </p>
                </UCard>
                <UCard variant="subtle">
                  <p class="text-center font-medium text-primary text-xl mt-2">
                    {{ nameDay }}
                  </p>
                  <p class="text-center text-sm text-dimmed">Today's Nameday</p>
                </UCard>
                <UCard variant="subtle">
                  <template v-if="!userSubjects">
                    <p class="text-center text-sm text-dimmed">
                      No subjects set yet.
                    </p>
                    <UButton
                      block
                      variant="subtle"
                      icon="ph:projector-screen-chart"
                      class="mt-4">
                      Set Subjects
                    </UButton>
                  </template>
                </UCard>
              </div>
            </div>
          </UPageBody>
        </UContainer>
      </UPage>
    </UMain>
    <AppFooter />
  </UApp>
</template>
