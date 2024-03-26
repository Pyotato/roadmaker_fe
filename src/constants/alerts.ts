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
    message:
      '내용은 필수입니다. 내용을 입력해주세요. \n 빈칸과 공백 이외의 내용을 입력해주세요.',
    color: 'orange',
  },
  auth: {
    id: 'no-auth-alert',
    title: '⚠️ 로그인이 필요합니다. ⚠️',
    message: '로그인 후 이용 가능합니다.',
    color: 'orange',
  },
};

export type Missing = typeof missing;
export type MissingKeys = keyof Missing;

export const sucess = {
  comment: {
    id: 'roadmap-comment-sucess',
    title: '댓글 생성!',
    message: '댓글 생성 완료!',
    color: 'teal',
  },
  roadmaps: {
    id: `roadmap-post-sucess`,
    title: '로드맵 생성 성공',
    color: 'teal',
  },
  signup: {
    id: `signup-sucess`,
    title: '회원 가입 성공',
    color: 'teal',
  },
};

export type Success = typeof sucess;
export type SuccessKeys = keyof Success;

export const fail = {
  409: {
    id: 'roadmap-signup-error',
    title: '⚠️ 중복 ⚠️',
    color: 'red',
  },
};

export type Fail = typeof fail;
export type FailKeys = keyof Fail;
