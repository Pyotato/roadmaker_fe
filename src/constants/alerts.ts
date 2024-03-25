export const missing = {
  title: {
    id: 'no-title-alert',
    title: '⚠️ 제목 ⚠️',
    message: '제목은 필수입니다. 로드맵 제목을 등록해주세요.',
    color: 'orange',
  },
  thumbnail: {
    id: 'no-thumnail-alert',
    title: '⚠️ 썸네일 ⚠️',
    message: '썸네일은 필수입니다. 썸네일을 등록해주세요.',
    color: 'orange',
  },
  description: {
    id: 'no-description-alert',
    title: '⚠️ 설명 ⚠️',
    message: '설명은 필수입니다. 로드맵 설명을 등록해주세요.',
    color: 'orange',
  },
  content: {
    id: 'no-content-alert',
    title: '⚠️ 내용 ⚠️',
    message: '내용은 필수입니다. 내용을 입력해주세요.',
    color: 'orange',
  },
};

export type Missing = typeof missing;
export type MissingKeys = keyof Missing;
