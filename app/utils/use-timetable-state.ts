import { LazyAppTimetableModal } from "#components";

export type DayEntry = {
  date: string;
  position: number;
  free: string;
  timetable: string[];
};

export const useTimetableState = (options: { target: Date }) => {
  const { target } = options;
  const overlay = useOverlay();
  const modal = overlay.create(LazyAppTimetableModal);
  const timetableCookie = useCookie<string[]>("timetable", {
    maxAge: 34560000,
  });

  const openModal = async () => {
    const instance = modal.open({
      timetable: timetableCookie.value ? timetableCookie.value : [],
    });

    const timetableResult = await instance.result;

    if (timetableResult) {
      timetableCookie.value = timetableResult as string[];
    }
  };

  const subjects = computed(() => {
    return timetableCookie.value
      ? useSubjects(timetableCookie.value)
      : { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
  });

  const dates = computed<DayEntry[]>(() => {
    const out: DayEntry[] = [];
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
  });

  const daysRemaining = computed(
    () => dates.value.filter((day) => day.free === "").length,
  );

  const countsOfSubjects = computed<Record<string, number>>(() => {
    const counts: Record<string, number> = {};
    dates.value.forEach((day) => {
      if (day.free !== "") return;
      day.timetable.forEach((subject) => {
        counts[subject] = (counts[subject] ?? 0) + 1;
      });
    });
    return counts;
  });

  return {
    dates,
    daysRemaining,
    countsOfSubjects,
    openModal,
  };
};
