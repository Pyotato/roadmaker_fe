'use client';

import { RichTextEditor } from '@mantine/tiptap';
import { Highlight } from '@tiptap/extension-highlight';
import { Link } from '@tiptap/extension-link';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { TextAlign } from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import { Underline } from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import { Content, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { PropsWithChildren, useMemo } from 'react';

import { DetailedContent } from './ReactFlow';

export interface NodeDetailsProps extends PropsWithChildren {
  details: DetailedContent;
}

const NodeDetails = ({ details }: NodeDetailsProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Youtube.configure({
        inline: false,
        ccLanguage: 'ko',
        interfaceLanguage: 'ko',
      }),
      Underline,
      Link,
      Superscript,
      Subscript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph', ''] }),
    ],

    editable: false,

    content: details.detailedContent,
  });

  useMemo(() => {
    const content = details.detailedContent as Content;
    editor?.commands.setContent(content);
  }, [details, editor?.commands]);

  return (
    <RichTextEditor editor={editor} style={{ border: 'none' }}>
      <RichTextEditor.Content
        className='post-rich-editor'
        style={{ lineHeight: '2rem' }}
      />
    </RichTextEditor>
  );
};
export default NodeDetails;
