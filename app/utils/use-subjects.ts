const subjects: Record<string, Record<number, number[]>> = {
  // region Bartoš
  des: {
    1: [2],
  },
  dej: {
    1: [3, 4],
  },
  sed: {
    1: [3],
  },
  // endregion
  // region Brosinger
  pas: {
    1: [1, 2],
    2: [3, 4],
  },
  svs: {
    1: [1],
    2: [2],
  },
  fil: {
    1: [3],
    2: [2],
  },
  // endregion
  // region Sadloň
  mat: {
    6: [2, 3],
    7: [2, 4],
  },
  cvm: {
    1: [1],
    2: [5],
  },
  gem: {
    1: [1],
    2: [3],
  },
  // endregion
  // region Kampoš
  pro: {
    1: [1],
  },
  inf: {
    6: [2],
  },
  cvp: {
    1: [3],
  },
  wet: {
    1: [5],
  },
  ipx: {
    1: [1],
    2: [5],
  },
  // endregion
  // region Záborský/Merchant
  che: {
    6: [2, 3],
    7: [4, 5],
  },
  chep: {
    1: [3],
    2: [2],
  },
  cvc: {
    1: [1],
    2: [2],
  },
  // endregion
  // region Dobrotová
  fyz: {
    6: [2, 4],
  },
  cvf: {
    1: [1, 3],
  },
  // endregion
  // region Dziurová
  sef: {
    1: [2],
  },
  // endregion
  // region Jurečková
  bio: {
    6: [1, 3],
    7: [3, 4],
  },
  seb: {
    1: [2],
    2: [1],
  },
  // endregion
  // region Nagyová
  geo: {
    1: [1, 2],
  },
  ges: {
    1: [1, 3],
  },
  // endregion
  // region Gálik
  deu: {
    1: [1, 5],
  },
  dku: {
    1: [3, 4],
  },
  // endregion
  // region Vantárová/Cerovský
  tsv: {
    15: [4],
    16: [5],
    17: [4],
    25: [5],
    26: [5],
  },
  // endregion
  // region Kolcún
  apa: {
    1: [1, 4],
    2: [1, 3],
  },
  // endregion
  // region Brveníková
  adk: {
    1: [1],
    2: [2],
  },
  // endregion
  // region Libič
  fs: {
    1: [1],
  },
  mdk: {
    1: [4],
  },
  // endregion
  // region Mičáňová
  sel: {
    1: [1],
  },
  // endregion
  // region Lojdová
  bae: {
    1: [4],
  },
  // endregion
  // region Bieliková
  knj: {
    1: [4],
  },
  // endregion
  // region Stanová
  ruj: {
    2: [5],
  },
  // endregion
  // region Stankovianska
  saj: {
    1: [5],
  },
  // endregion
};

export const useTimetable = () => {
  return Object.entries(subjects).flatMap(([subject, groups]) =>
    Object.entries(groups).flatMap(([group]) =>
      `${subject}${group}`.toUpperCase(),
    ),
  );
};

export default (timetable: string[]) => {
  const result: Record<number, string[]> = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  };

  timetable.forEach((entry) => {
    // split subject and group. Subject is char part and group is number part, they have variable length
    const match = entry.toLowerCase().match(/^([a-zA-Z]+)(\d+)$/);
    if (!match) return;

    const [, subject, group] = match;
    const subjectGroups = subjects[subject];
    if (!subjectGroups) return;

    const groupKey = Number(group);
    const days = subjectGroups[groupKey];
    if (!days) return;

    days.forEach((day) => {
      if (!result[day]) result[day] = [];
      result[day].push(entry.toUpperCase());
    });
  });
  return result;
};
