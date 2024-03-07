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

/**
 * 페이지 url에서 정규표현식을 활용해 페이지 번호를 구하는 함수입니다.
 */
export const getPageNum = (next: string) => {
  if (!next) return null;
  const findPageParamRegex = /page=[0-9]{1,}/g;
  const searchNext = next && next.match(findPageParamRegex);
  const pageNum = Number(searchNext && searchNext[0].split('=')[1]);
  return pageNum;
};
