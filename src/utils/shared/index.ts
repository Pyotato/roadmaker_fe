export const omit = <T extends Record<string, unknown>>(
  obj: T,
  ...args: Array<keyof T>
) => {
  const objKeys = Object.keys(obj);
  return objKeys.reduce(
    (acc, curr) => {
      if (args.includes(curr)) {
        return acc;
      }
      acc[curr] = obj[curr];
      return acc;
    },
    {} as Record<string, unknown>,
  );
};

export const pick = <T extends Record<string, unknown>>(
  obj: T,
  ...args: Array<keyof T>
): Partial<T> => {
  return args.reduce((acc, curr) => {
    if (curr in obj) {
      acc[curr] = obj[curr];
    }
    return acc;
  }, {} as Partial<T>);
};

export const toTSXString = (v: unknown) => `${v}`;
