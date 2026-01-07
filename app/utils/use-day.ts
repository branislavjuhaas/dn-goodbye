const holidays = [
  // region Christmas break
  "2025-12-22",
  "2025-12-23",
  "2025-12-24",
  "2025-12-25",
  "2025-12-26",
  "2025-12-27",
  "2025-12-28",
  "2025-12-29",
  "2025-12-30",
  "2025-12-31",
  "2026-01-01",
  "2026-01-02",
  "2026-01-03",
  "2026-01-04",
  "2026-01-05",
  "2026-01-06",
  "2026-01-07",
  // endregion
  // region Half-year break
  "2026-02-02",
  // endregion
  // region Spring break
  "2026-02-21",
  "2026-02-22",
  "2026-02-23",
  "2026-02-24",
  "2026-02-25",
  "2026-02-26",
  "2026-02-27",
  "2026-02-28",
  // endregion
  // region EČ MS
  "2026-03-10",
  "2026-03-11",
  // endregion
  // region Entrance exams
  "2026-03-23",
  "2026-03-30",
  // endregion
  // region Easter break
  "2026-04-02",
  "2026-04-03",
  "2026-04-04",
  "2026-04-05",
  "2026-04-06",
  "2026-04-07",
  // endregion
  // region Labor Day
  "2026-05-01",
  // endregion
];

/**
 * Given a Date, return a small object describing:
 * - date: ISO date string (YYYY-MM-DD)
 * - position: weekday number (0 = Sunday .. 6 = Saturday)
 * - free: concatenation flags: "e" for weekend, "h" for holiday, "" otherwise
 *
 * The holidays array above contains ISO date strings that are treated as full-day holidays.
 */
export default (day: Date) => {
  const isoDate = day.toISOString().slice(0, 10);
  const dayOfWeek = day.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const isHoliday = holidays.includes(isoDate);
  return {
    date: isoDate,
    position: dayOfWeek,
    free: `${isWeekend ? "e" : ""}${isHoliday ? "h" : ""}`,
  };
};
