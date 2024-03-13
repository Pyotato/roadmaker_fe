'use client';

import { Button, Container } from '@mantine/core';
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
import { useMemo, useState } from 'react';
import styled from 'styled-components';

import TipTapTextEditor from '@/components/shared/tiptap/TipTapTextEditor';

import { getApiResponse } from '@/utils/shared/get-api-response';

const CommentBox = () => {
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
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: content,
    onUpdate(e) {
      setContent(e.editor.getHTML());
    },
  });

  const queryClient = useQueryClient();

  const postResponseFromApi = async () => {
    await Promise.all([
      getApiResponse<undefined>({
        requestData: JSON.stringify({
          content: content,
          roadmapId: Number(currPostId[0]),
        }),
        apiEndpoint: `${process.env.NEXT_PUBLIC_API}/comments`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }),
    ]);

    setContent('');

    editor?.commands.setContent('');
    queryClient.invalidateQueries({ queryKey: ['comments', currPostId[0]] });
  };

  const tiptapEditor = useMemo(() => {
    return (
      <EditorWrap>
        <TipTapTextEditor editor={editor} />
      </EditorWrap>
    );
  }, [editor]);

  return (
    <Container py='xl'>
      <EditorWrap>
        {tiptapEditor}
        <div className='btnWrap'>
          <Button
            my='xl'
            type='button'
            onClick={postResponseFromApi}
            className='btn'
            disabled={editor?.getText() === ''}
          >
            댓글 달기
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
