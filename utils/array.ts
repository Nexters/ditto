export const pickFirst = <T>(smt: T | T[] | null) => {
  if (!smt) return null;
  if (Array.isArray(smt)) return smt[0] ?? null;
  return smt;
};

export const isNonNullable = <T>(smt?: T | null): smt is T => {
  return smt != null;
};
