export const WARNING = {
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
  youtube: {
    id: 'no-youtube-alert',
    title: '⚠️ 유튜브 링크를 찾지 못했습니다. ⚠️',
    message: '유튜브 링크 url을 다시 확인해주세요.',
    color: 'orange',
  },
};

export const SUCCESS = {
  comment: {
    id: 'roadmap-comment-success',
    title: '댓글 생성!',
    message: '댓글 생성 완료!',
    color: 'teal',
  },
  roadmaps: {
    id: `roadmap-post-success`,
    title: '로드맵 생성 성공',
    color: 'teal',
  },
  signup: {
    id: `signup-success`,
    title: '회원 가입 성공',
    color: 'teal',
  },
  join: {
    id: `join-success`,
    title: '로드맵 참여 성공',
    color: 'teal',
  },
  user: {
    id: `update-user-info-success`,
    title: '내 정보 수정 성공',
    color: 'teal',
  },
};

export const FAIL = {
  409: {
    id: 'duplicate-info-error',
    title: '⚠️ 중복 ⚠️',
    color: 'red',
  },
  401: {
    id: 'unauthenticated-user-error',
    title: '⚠️ 로그인이 필요한 행동입니다 ⚠️',
    color: 'red',
  },
  500: {
    id: 'internal-server-error',
    title: '⚠️ 예기지 못한 에러가 발생했습니다 ⚠️',
    color: 'red',
  },
};
