const announcements = [
  {
    id: "new-year",
    message: "Happy Holidays! Do not stress about BG MH, chill out.",
    date: new Date("2026-01-01"),
    tolerance: 10,
  },
  {
    id: "ecms",
    message: "M word is coming! Be ready for EČ MS MAT in {days} days.",
    date: new Date("2026-03-12"),
    tolerance: 10,
  },
  {
    id: "pfic-p",
    message: "Prepare for PFIČ in {days} days. Start revising!",
    date: new Date("2026-04-13"),
    tolerance: 10,
  },
  {
    id: "pfic",
    message: "PFIČ in progress! Good luck!",
    date: new Date("2026-04-18"),
    tolerance: 5,
  },
  {
    id: "ufic-p",
    message: "ÚFIČ is coming in {days} days. Stay focused!",
    date: new Date("2026-05-20"),
    tolerance: 10,
  },
  {
    id: "ufic",
    message: "ÚFIČ is coming in {days} days. Stay focused!",
    date: new Date("2026-05-23"),
    tolerance: 3,
  },
  {
    id: "sunset",
    message: "Due to the author's graduation, this app will be soon sunset.",
    date: new Date("2026-06-01"),
    tolerance: 10,
  },
];

export default (day: Date) => {
  const result: string[] = [];

  for (const announcement of announcements) {
    const diff = Math.ceil(
      (announcement.date.getTime() - day.getTime()) / (1000 * 3600 * 24),
    );

    if (diff <= 0) {
      continue;
    }

    if (diff < announcement.tolerance) {
      result.push(announcement.message.replace("{days}", diff.toString()));
    }
  }

  return result;
};
