'use client';

import BulletList from '@tiptap/extension-bullet-list';
import Highlight from '@tiptap/extension-highlight';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Placeholder from '@tiptap/extension-placeholder';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { Node, useUpdateNodeInternals } from 'reactflow';

import TipTapTextEditor from '@/components/shared/tiptap/TipTapTextEditor';

import { omit } from '@/utils/shared';

interface CustomNodeWithDetails extends Node {
  detailedContent?: string;
}

const DetailContentEditor = ({
  clickedNode,
  setClickedNode,
  setNodes,
  nodes,
}: {
  clickedNode: CustomNodeWithDetails;
  setClickedNode: Dispatch<SetStateAction<Node | null>>;
  setNodes: Dispatch<SetStateAction<Node[]>>;
  nodes: Node[];
}) => {
  const [content, setContent] = useState(clickedNode?.detailedContent ?? '');
  const updateNodeInternals = useUpdateNodeInternals();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: '상세 내용을 입력해주세요.',
      }),
      Underline,
      Link,
      Italic,
      Superscript,
      Subscript,
      Highlight,
      ListItem,
      Youtube.configure({
        inline: false,
        ccLanguage: 'ko',
        interfaceLanguage: 'ko',
      }),
      BulletList.configure({
        itemTypeName: 'listItem',
        keepMarks: true,
      }),
      OrderedList.configure({
        itemTypeName: 'listItem',
        keepMarks: true,
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: content,
    onUpdate(e) {
      setContent(e.editor.getHTML().replace(' ', '&nbsp'));
    },
  });

  useMemo(() => {
    const newDetail = content;
    const tempClickedNode = clickedNode as unknown as Record<string, unknown>;
    const temp = {
      ...omit(tempClickedNode, 'detailedContent'),
      detailedContent: newDetail,
    } as unknown as Node;

    setClickedNode(temp);
    const newNodes = nodes.reduce((acc, curr) => {
      if (curr.id === temp.id) {
        acc.push(temp);
        return acc;
      } else {
        acc.push(curr);
      }
      return acc;
    }, [] as Node[]);
    setNodes([...newNodes]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  /**
   * 클릭한 노드의 상세 내용이 에디터 내용으로 채우기
   */
  useMemo(() => {
    setContent(clickedNode?.detailedContent ?? '');
    editor?.commands.setContent(clickedNode.detailedContent ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedNode]);

  useMemo(() => {
    updateNodeInternals(clickedNode.id);
  }, [clickedNode, updateNodeInternals]);

  const tiptapEditor = useMemo(() => {
    return <TipTapTextEditor editor={editor} />;
  }, [editor]);

  return <>{tiptapEditor}</>;
};

export default DetailContentEditor;
