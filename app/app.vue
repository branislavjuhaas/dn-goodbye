<script setup lang="ts">
import { LazyAppTimetableModal } from "#components";
/**
 * Target date for the countdown (end of whatever is being tracked).
 * Keep as a Date object so computations use local timezone when needed.
 */
const target = new Date("2026-05-13");

/**
 * Overlay helper + modal instance used to open the timetable editor.
 * overlay.create(LazyAppTimetableModal) returns an object that can open the modal
 * and expose a result promise for the selected timetable.
 */
const overlay = useOverlay();
const modal = overlay.create(LazyAppTimetableModal);

/**
 * Persistent cookie that stores the chosen timetable.
 * Type: string[] (array of subject+group identifiers like "MAT1").
 */
const timetableCookie = useCookie<string[]>("timetable", {
  maxAge: 34560000,
});

/**
 * Opens the timetable modal and waits for the result. If the user saves a
 * timetable the cookie is updated.
 */
const openModal = async () => {
  const instance = modal.open({
    timetable: timetableCookie.value ? timetableCookie.value : [],
  });

  const timetableResult = await instance.result;

  if (timetableResult) {
    // Save the returned timetable (array of strings) into the cookie
    timetableCookie.value = timetableResult as any;
  }
};

/**
 * subjects computed property maps the stored timetable into a per-day
 * structure using the useSubjects helper. If no timetable is set, returns
 * an empty mapping for days 0..6.
 */
const subjects = computed(() => {
  return timetableCookie.value
    ? useSubjects(timetableCookie.value)
    : { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
});

/**
 * dates computed builds the list of days from today (or tomorrow if after 15:00)
 * up to the target date. Each entry includes ISO date, weekday position, free flags
 * and the day's timetable subjects (from `subjects`).
 */
const dates = computed(
  (): {
    date: string;
    position: number;
    free: string;
    timetable: string[];
  }[] => {
    const out: {
      date: string;
      position: number;
      free: string;
      timetable: string[];
    }[] = [];
    const start = new Date();
    if (start.getHours() > 15) {
      start.setDate(start.getDate() + 1);
    }

    for (let d = new Date(start); d <= target; d.setDate(d.getDate() + 1)) {
      out.push({
        ...useDay(new Date(d)),
        timetable: subjects.value[d.getDay()] || [],
      });
    }

    return out;
  },
);

/**
 * countsOfSubjects aggregates how many occurrences a subject has in the date range.
 * Returned object maps subject string -> count.
 */
const countsOfSubjects = computed(() => {
  const counts: Record<string, number> = {};
  dates.value.forEach((d) => {
    // skip free days (free !== "" means the day is free)
    if ((d as any).free !== "") return;
    d.timetable.forEach((subject) => {
      counts[subject] = (counts[subject] ?? 0) + 1;
    });
  });
  return counts;
});

/**
 * daysRemaining counts days that are not marked free (free === ""), used in UI.
 */
const daysRemaining = dates.value.filter((d) => (d as any).free === "").length;

/**
 * Simple percentage progress indicator based on a fixed total (950).
 */
const studyProgress = ((950 - daysRemaining) / 950) * 100;

/**
 * Nameday for today (uses useNameday helper)
 */
const nameDay = useNameday(new Date());
</script>

<template>
  <UApp>
    <UMain class="flex flex-col justify-center">
      <UPage>
        <UContainer>
          <UPageBody>
            <div class="items-center">
              <p class="text-base font-semibold text-primary text-center">
                Greetings, martyr! Your suffering will be over in
              </p>
              <h1
                class="mt-2 text-4xl sm:text-5xl font-bold text-highlighted text-center text-balance">
                {{ daysRemaining }} Days
              </h1>
              <div
                class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
                <UCard variant="subtle">
                  <UProgress v-model="studyProgress" status />
                  <p class="truncate w-full mt-1 text-end text-sm text-primary">
                    Study Progres
                  </p>
                </UCard>
                <UCard variant="subtle">
                  <p class="font-medium text-primary text-xl">
                    {{ nameDay }}
                  </p>
                  <p class="text-sm text-dimmed">Today's nameday</p>
                </UCard>
                <UCard variant="subtle" class="sm:col-span-2">
                  <template v-if="Object.keys(countsOfSubjects).length > 0">
                    <div
                      class="flex flex-row items-center justify-center gap-2 flex-wrap">
                      <UBadge
                        v-for="(subject, index) in Object.keys(
                          countsOfSubjects,
                        )"
                        :key="index"
                        :color="
                          (countsOfSubjects[subject] ?? 0) >= 30
                            ? 'error'
                            : (countsOfSubjects[subject] ?? 0) >= 18
                              ? 'warning'
                              : (countsOfSubjects[subject] ?? 0) >= 10
                                ? 'info'
                                : 'success'
                        "
                        variant="subtle">
                        <b>{{ subject }}</b>
                        {{ (countsOfSubjects[subject] ?? 0) * 2 }}
                      </UBadge>
                      <UButton
                        variant="subtle"
                        icon="ph:projector-screen-chart"
                        size="xs"
                        @click="openModal">
                        <b>EDIT</b>
                      </UButton>
                    </div>
                  </template>
                  <template v-else>
                    <p class="text-center text-sm text-dimmed">
                      No subjects set yet
                    </p>
                    <UButton
                      block
                      variant="subtle"
                      icon="ph:projector-screen-chart"
                      class="mt-4"
                      @click="openModal">
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
