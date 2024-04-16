import { PropsWithChildren } from 'react';
import { Viewport } from 'reactflow';

import { API_ROUTES } from '@/constants';

import { DataWithPages } from '.';
import { CustomEdge, CustomNode, ReactFlowInfo } from './reactFlow';
import { AboutInfo, Member, UserData } from './user';

export const url = `${API_ROUTES.roadmapPaged}2&order-type=recent` as const;

export interface Post {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: typeof url;
  likeCount: number;
  joinCount: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  member: UserData;
}

export interface Postdata extends DataWithPages {
  result: Array<Post | null>;
}

export interface PageProps extends PropsWithChildren {
  postData: Postdata | null;
}

export interface RoadMapInfo extends Post {
  [key: string]: unknown;
  isJoined: boolean;
  isLiked: boolean;
  joinCount: number;
  likeCount: number;
  member: Member;
  updatedAt: string;
  viewport: Viewport;
  edges: Array<CustomEdge>;
  nodes: Array<CustomNode>;
}

export interface DetailedContent {
  id: CustomNode['id'];
  detailedContent: CustomNode['detailedContent'];
}

export type AboutKeys = 'viewport' | 'edges' | 'nodes';

export type aboutInfoKeys = keyof AboutInfo;

export interface ReactFlowProps extends PropsWithChildren {
  reactFlowInfo: ReactFlowInfo;
}

export interface JoinProps extends PropsWithChildren {
  joinInfo: {
    isJoined: boolean;
    joinCount: number;
  };
}

export interface LikeProps extends PropsWithChildren {
  likesInfo: {
    isLiked: AboutInfo['isLiked'];
    likeCount: AboutInfo['likeCount'];
  };
}

export interface RoadMapInfoQuery {
  roadMapInfo: RoadMapInfo;
}

export interface HttpResponse {
  httpStatus: number;
  message: string;
  errorCode: string;
}

export type LikePostResponse = HttpResponse | LikeProps['likesInfo'];

export interface AboutProps extends PropsWithChildren {
  aboutInfo: AboutInfo;
}
export interface CreatorProps extends PropsWithChildren {
  creatorInfo: {
    member: AboutInfo['member'];
  };
}
