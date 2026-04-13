const announcements = [
  {
    id: "new-year",
    messageKey: "announcements.newYear",
    date: new Date("2026-01-01"),
    tolerance: 10,
  },
  {
    id: "ecms",
    messageKey: "announcements.ecms",
    date: new Date("2026-03-12"),
    tolerance: 10,
  },
  {
    id: "pfic-p",
    messageKey: "announcements.pficPrep",
    date: new Date("2026-04-13"),
    tolerance: 10,
  },
  {
    id: "pfic",
    messageKey: "announcements.pfic",
    date: new Date("2026-04-17"),
    tolerance: 5,
  },
  {
    id: "ufic-p",
    messageKey: "announcements.uficPrep",
    date: new Date("2026-05-20"),
    tolerance: 10,
  },
  {
    id: "ufic",
    messageKey: "announcements.ufic",
    date: new Date("2026-05-23"),
    tolerance: 3,
  },
  {
    id: "sunset",
    messageKey: "announcements.sunset",
    date: new Date("2026-06-01"),
    tolerance: 10,
  },
];

export default (day: Date) => {
  const result: string[] = [];
  const { t } = useI18n();

  for (const announcement of announcements) {
    const diff = Math.ceil(
      (announcement.date.getTime() - day.getTime()) / (1000 * 3600 * 24),
    );

    if (diff <= 0) {
      continue;
    }

    if (diff < announcement.tolerance) {
      result.push(t(announcement.messageKey, { days: diff }));
    }
  }

  return result;
};
