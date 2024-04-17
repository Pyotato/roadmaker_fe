import { PropsWithChildren } from 'react';

import { DataWithPages } from '.';

export interface Comment {
  roadmapId: number;
  content: string;
  createdAt: string | Date;
  updatedAt: string | Date;

  member: {
    avatarUrl?: string;
    nickname: string;
  };
}
export interface CommentData extends DataWithPages {
  result: Array<Comment | null>;
}

export interface CommentProps extends PropsWithChildren {
  commentData: CommentData['result'];
  innerRef?: (node?: Element | null) => void;
}
