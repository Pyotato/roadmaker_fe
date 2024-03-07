'use client';

import { Button, Container } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import { Placeholder } from '@tiptap/extension-placeholder';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import styled from 'styled-components';

import { getApiResponse } from '@/utils/shared/get-api-response';

const CommentBox = () => {
  const params = useParams<{ tag: string; item: string; id: string[] }>();
  const currPostId = params.id!;

  const [content, setContent] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: '로드맵 상세 내용을 입력해주세요.',
      }),
      Underline,
      Link,
      Superscript,
      Subscript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],

    content: content,
    onUpdate(e) {
      setContent(e.editor.getHTML());
    },
  });

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
  };

  const tiptapEditor = useMemo(() => {
    return (
      <EditorWrap>
        <RichTextEditor editor={editor} style={{ width: '100%' }}>
          <RichTextEditor.Toolbar sticky stickyOffset={5}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight />
              <RichTextEditor.Code />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote />
              <RichTextEditor.Hr />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
              <RichTextEditor.Subscript />
              <RichTextEditor.Superscript />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.AlignLeft />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.AlignJustify />
              <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>
          <RichTextEditor.Content style={{ minHeight: '20em' }} />
        </RichTextEditor>
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
