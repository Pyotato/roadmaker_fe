'use client';

import { Highlight } from '@tiptap/extension-highlight';
import { Link } from '@tiptap/extension-link';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
const NodeDetails = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
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
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    editable: false,
    // content: state.filter((v) => v.id === id)[0]?.details || '',
    // onUpdate(e) {
    //   setToggle(e.editor?.getHTML());
    // eslint-disable-next-line array-callback-return
    //   state.forEach((item, idx) => {
    // if (item.id !== id) return;
    // const copyState = [...state];
    // copyState.splice(idx, 1, {
    //   id: item.id,
    //   details: e.editor?.getHTML(),
    // });
    // setState(copyState);
    //   });
    // },
  });
  return (
    <EditorContent editor={editor} readOnly style={{ lineHeight: '2rem' }} />
  );
};
export default NodeDetails;
