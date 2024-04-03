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
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useParams } from 'next/navigation';
import { JWT } from 'next-auth/jwt';
import { signIn, useSession } from 'next-auth/react';
import { useMemo, useState } from 'react';
import styled from 'styled-components';

import TipTapTextEditor from '@/components/shared/tiptap/TipTapTextEditor';

import { apiRoutes, success, warning } from '@/constants';
import { getApiResponse } from '@/utils/shared/get-api-response';

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
      Link,
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
      setContent(e.editor.getHTML().replace(' ', '&nbsp'));
    },
  });

  const queryClient = useQueryClient();

  const postResponseFromApi = async () => {
    const accessToken = token as unknown as JWT;
    await Promise.all([
      getApiResponse<undefined>({
        requestData: JSON.stringify({
          content: content,
          roadmapId: Number(currPostId[0]),
        }),
        apiEndpoint: `${apiRoutes.comments}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken?.token}`,
          'Content-Type': 'application/json',
        },
      }),
    ]);

    setContent('');
    notifications.show({
      id: success.comment.id,
      withCloseButton: true,
      autoClose: 1000,
      title: success.comment.title,
      message: success.comment.message,
      color: success.comment.color,
      icon: <IconCheck style={{ width: '20rem', height: '20rem' }} />,
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
                  id: warning.content.id,
                  withCloseButton: true,
                  autoClose: 1000,
                  title: warning.content.title,
                  message: warning.content.message,
                  color: warning.content.color,
                  icon: (
                    <IconExclamationMark
                      style={{ width: '20rem', height: '20rem' }}
                    />
                  ),
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
