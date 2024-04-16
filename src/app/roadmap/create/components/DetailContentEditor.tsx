'use client';

import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import { JSONContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { Node, useUpdateNodeInternals } from 'reactflow';

import TipTapTextEditor from '@/components/shared/TipTapTextEditor';

import { EMPTY_YOUTUBE_HTML, REGEX_HTTP, YOUTUBE_SEARCH } from '@/constants';
import { newUrl, omit } from '@/utils/shared';

import { CustomNodeWithDetails } from '@/types/reactFlow';

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
  const updateNodeInternals = useUpdateNodeInternals();

  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: '상세 내용을 입력해주세요.',
        }),
        Underline,
        Link.configure({
          validate: (href) => {
            if (href.match(YOUTUBE_SEARCH) || href.match(REGEX_HTTP))
              return true;
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
      content: clickedNode?.detailedContent,
      onUpdate(e) {
        const tempClickedNode = clickedNode as unknown as Record<
          string,
          unknown
        >;

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
          urlLists.forEach((v) =>
            e.editor.commands.setContent(
              e.editor.getHTML().replace(EMPTY_YOUTUBE_HTML, newUrl(v)),
            ),
          );
          break;
        }
        const temp = {
          ...omit(tempClickedNode, 'detailedContent'),
          detailedContent: e.editor.getHTML(),
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
      },
    },
    [clickedNode.id],
  );

  useMemo(() => {
    updateNodeInternals(clickedNode.id);
  }, [clickedNode, updateNodeInternals]);

  const tiptapEditor = useMemo(() => {
    return <TipTapTextEditor editor={editor} />;
  }, [editor]);

  return <>{tiptapEditor}</>;
};

export default DetailContentEditor;
