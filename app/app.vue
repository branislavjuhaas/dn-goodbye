<script setup lang="ts">
import { LazyAppTimetableModal } from "#components";

const display = useState(() => Math.floor(900 + Math.random() * 100));
const gsap = useGSAP();
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
 * timetable, the cookie is updated.
 *
 * Returns: Promise<void>
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
 * subjects computed property
 * - Maps the stored timetable into a per-day structure using the useSubjects helper.
 * - If no timetable is set, returns an empty mapping for days 0..6.
 * Returns: Record<number, string[]>
 */
const subjects = computed(() => {
  return timetableCookie.value
    ? useSubjects(timetableCookie.value)
    : { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
});

/**
 * dates computed
 * - Builds the list of days from today (or tomorrow if after 15:00) up to the target date.
 * - Each entry includes ISO date, weekday position, free flags and day's timetable subjects.
 * Returns: Array<{ date: string; position: number; free: string; timetable: string[] }>
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
 * countsOfSubjects
 * - Aggregates how many occurrences a subject has in the date range.
 * - Returned object maps subject string -> count.
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
 * Nameday for today (uses useNameday helper)
 */
const nameDay = useNameday(new Date());

/*
 * Computed value of the study progress bar (0..100)
 */
const progressBarValue = computed(
  () => (Math.max(950 - display.value, 0) / 950) * 100,
);

onMounted(() => {
  const obj = { val: display.value };

  gsap.to(obj, {
    val: daysRemaining,
    duration: 3.5 + Math.random(),
    ease: "expo.out",
    onUpdate: () => {
      display.value = Math.round(obj.val);
    },
  });
});
</script>

<template>
  <UApp>
    <AppAnnouncements />
    <UMain class="flex flex-col justify-center">
      <UPage>
        <UContainer>
          <UPageBody>
            <AppCountdownHero
              :display="display"
              :progress-bar-value="progressBarValue"
              :name-day="nameDay as string">
              <AppSubjectStats
                :counts-of-subjects="countsOfSubjects"
                @edit="openModal" />
            </AppCountdownHero>
          </UPageBody>
        </UContainer>
      </UPage>
    </UMain>
    <AppFooter />
  </UApp>
</template>
