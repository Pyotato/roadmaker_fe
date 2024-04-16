'use client';

import {
  Button,
  Container,
  LoadingOverlay,
  UnstyledButton,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconExclamationMark } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import { Placeholder } from '@tiptap/extension-placeholder';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import { JSONContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { JWT } from 'next-auth/jwt';
import { signIn, useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import styled from 'styled-components';

import TipTapTextEditor from '@/components/shared/TipTapTextEditor';

import {
  API_ROUTES,
  EMPTY_YOUTUBE_HTML,
  FAIL,
  REGEX_HTTP,
  SUCCESS,
  WARNING,
  YOUTUBE_SEARCH,
} from '@/constants';
import { getApiResponse } from '@/utils/get-api-response';
import { newUrl } from '@/utils/shared';

const CommentBox = () => {
  const { data: token, status } = useSession();
  const params = useParams<{ tag: string; item: string; id: string[] }>();
  const currPostId = params.id;
  const [content, setContent] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: '댓글을 달아주세요.',
      }),
      Underline,
      Link.configure({
        validate: (href) => {
          if (href.match(YOUTUBE_SEARCH) || href.match(REGEX_HTTP)) return true;
          else return false;
        },
      }),
      Superscript,
      Subscript,
      Highlight,
      Youtube.configure({
        inline: false,
        ccLanguage: 'ko',
        interfaceLanguage: 'ko',
        enableIFrameApi: true,
        origin: process.env.SITE_URL,
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: content,
    onUpdate(e) {
      const contentUrl = e.editor?.getJSON()?.content as JSONContent[];
      const urlLists = contentUrl.reduce((acc, curr) => {
        if (curr?.type === 'youtube') {
          const src = curr?.attrs?.src as string;
          return [...acc, src];
        }
        return acc;
      }, [] as Array<string>);
      while (e.editor.getHTML().match(EMPTY_YOUTUBE_HTML)) {
        e.editor.getHTML().match(EMPTY_YOUTUBE_HTML);
        urlLists.forEach((v) => {
          e.editor.commands.setContent(
            e.editor.getHTML().replace(EMPTY_YOUTUBE_HTML, newUrl(v)),
          );
          setContent(e.editor.getHTML().replace(EMPTY_YOUTUBE_HTML, newUrl(v)));
        });
        break;
      }
      setContent(e.editor.getHTML());
    },
  });

  const queryClient = useQueryClient();

  const postResponseFromApi = async () => {
    const accessToken = token as unknown as JWT;
    const res = await Promise.resolve(
      getApiResponse<undefined>({
        requestData: JSON.stringify({
          content: content,
          roadmapId: Number(currPostId[0]),
        }),
        apiEndpoint: `${API_ROUTES.comments}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken?.token}`,
          'Content-Type': 'application/json',
        },
      }),
    );

    if (res?.errorCode === 401) {
      notifications.show({
        id: FAIL['401'].id,
        withCloseButton: true,
        autoClose: 300,
        title: FAIL['401'].title,
        message: `${res.message}\n로그인 후 이용해주세요.`,
        color: FAIL['401'].color,
        icon: <IconExclamationMark className='icon' />,
      });
      setTimeout(() => {
        signIn();
      }, 400);
      return;
    }

    setContent('');
    notifications.show({
      id: SUCCESS.comment.id,
      withCloseButton: true,
      autoClose: 1000,
      title: SUCCESS.comment.title,
      message: SUCCESS.comment.message,
      color: SUCCESS.comment.color,
      icon: <IconCheck className='icon' />,
    }),
      editor?.commands.setContent('');
    queryClient.invalidateQueries({ queryKey: ['comments', currPostId[0]] });
  };

  const tiptapEditor = useMemo(() => {
    if (status === 'unauthenticated')
      return (
        <UnstyledButton onClick={() => signIn()}>
          로그인 후 이용 가능합니다.
        </UnstyledButton>
      );
    return (
      <EditorWrap>
        <TipTapTextEditor editor={editor} />
      </EditorWrap>
    );
  }, [editor, status]);

  return (
    <Container py='xl'>
      <EditorWrap>
        {tiptapEditor}
        <div className='btnWrap'>
          <Button
            my='xl'
            type='button'
            onClick={() => {
              if (editor?.isEmpty) {
                notifications.show({
                  id: WARNING.content.id,
                  withCloseButton: true,
                  autoClose: 1000,
                  title: WARNING.content.title,
                  message: WARNING.content.message,
                  color: WARNING.content.color,
                  icon: <IconExclamationMark className='icon' />,
                });
                setContent('');
                editor?.commands.setContent('');
                return;
              }
              postResponseFromApi();
            }}
            className='btn'
            disabled={editor?.isEmpty}
          >
            {status === 'authenticated' ? (
              '댓글 달기'
            ) : status === 'unauthenticated' ? (
              '로그인 후 이용'
            ) : (
              <LoadingOverlay />
            )}
          </Button>
        </div>
      </EditorWrap>
    </Container>
  );
};

const EditorWrap = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  & .btn:hover {
    cursor: pointer;
  }

  & .btnWrap {
    display: inline-flex;
    justify-content: flex-end;
    width: 100%;
  }
`;

export default CommentBox;
