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
export const getPageNum = (next: string | null) => {
  if (!next) return null;
  const findPageParamRegex = /page=[0-9]{1,}/g;
  const searchNext = next.match(findPageParamRegex);
  if (searchNext) {
    return Number(searchNext[0].split('=')[1]);
  } else return null;
};
/**
 * tiptap 에디터의 a 태그로 변환
 */
export const newUrl = (url: string) =>
  `<p><a target="_blank" rel="noopener noreferrer nofollow" href="${url}">${url}</a></p>`;

/**
 * 2024-04-08T02:15:06.503546 형식의 날짜, 시간을
 * 2024년 4월 8일 월요일 오전 2:15 형태로 변환
 */

export const toKorDateTime = (time: string | Date) => {
  const temp = new Date(`${time}`);
  return new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(temp);
};
