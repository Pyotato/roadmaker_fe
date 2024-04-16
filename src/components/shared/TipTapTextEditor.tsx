'use client';
import { Box, Button, Text, TextInput, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { RichTextEditor } from '@mantine/tiptap';
import {
  IconBrandYoutubeFilled,
  IconExclamationMark,
} from '@tabler/icons-react';
import { Editor } from '@tiptap/react';

import { WARNING } from '@/constants';
import { getApiResponse } from '@/utils/get-api-response';

const TipTapTextEditor = ({ editor }: { editor: Editor | null }) => {
  let url = '';
  if (!editor) return null;
  const openModal = () =>
    modals.openConfirmModal({
      title: '유튜브 링크',
      children: (
        <>
          <Box display='inline-flex'>
            <Text size='sm' pb='sm'>
              유튜브 링크를 입력해주세요.
            </Text>
          </Box>
          <TextInput
            leftSection={<IconBrandYoutubeFilled />}
            type='text'
            onChange={(e) => {
              url = e.currentTarget.value;
            }}
            onBlur={(e) => (url = e.currentTarget.value)}
          />
        </>
      ),
      labels: { confirm: '확인', cancel: '취소' },
      onConfirm: async () => {
        if (url) {
          const res = await Promise.resolve(
            getApiResponse({ apiEndpoint: url }),
          );
          if (res !== null) {
            editor.commands.insertContent(
              `<div data-youtube-video><iframe src="${url}"></iframe></div>`,
            );
            editor.commands.enter();
          } else {
            notifications.show({
              id: WARNING.youtube.id,
              withCloseButton: true,
              autoClose: 6000,
              title: WARNING.youtube.title,
              message: WARNING.youtube.message,
              color: WARNING.youtube.color,
              icon: <IconExclamationMark className='icon' />,
            });
          }
        }
      },
      onCancel: () => (url = ''),
    });

  return (
    <RichTextEditor editor={editor}>
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

        <Tooltip label='add youtube' position='bottom'>
          <Button variant='default' className='yt_btn sm_btn'>
            <IconBrandYoutubeFilled
              onClick={openModal}
              data-disabled
              size='1rem'
            />
          </Button>
        </Tooltip>

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
      <RichTextEditor.Content />
    </RichTextEditor>
  );
};

export default TipTapTextEditor;
