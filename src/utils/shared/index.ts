/**
 * 타입스크립트 Omit와 같이 동작하지만
 * Object의 키를 string의 args로 받아 온 값을 제외하고 새로운 Object를 반환하는 함수
 */
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

/**
 * 타입스크립트 Pick과 같이 동작하지만
 * Object의 키를 string의 args로 받아 온 값만을 취하고 새로운 Object를 반환하는 함수
 */
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
