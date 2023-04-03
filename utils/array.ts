export const pickFirst = <T>(smt: T | T[] | null) => {
  if (!smt) return null;
  if (Array.isArray(smt)) return smt[0] ?? null;
  return smt;
};

export const isNonNullable = <T>(smt?: T | null): smt is T => {
  return smt != null;
};

export const makeArray = <T>(smt: T | T[] | null): T[] => {
  if (!smt) return [];
  if (Array.isArray(smt)) return smt;
  return [smt];
};
