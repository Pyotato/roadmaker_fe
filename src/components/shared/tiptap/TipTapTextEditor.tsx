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

import { warning } from '@/constants';
import { getApiResponse } from '@/utils/shared/get-api-response';

const TipTapTextEditor = ({ editor }: { editor: Editor | null }) => {
  let url = '';
  if (!editor) return null;
  const openModal = () =>
    modals.openConfirmModal({
      title: '유튜브 링크',
      children: (
        <Box>
          <Box display='inline-flex' style={{ alignItems: 'center' }}>
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
        </Box>
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
              id: warning.youtube.id,
              withCloseButton: true,
              autoClose: 6000,
              title: warning.youtube.title,
              message: warning.youtube.message,
              color: warning.youtube.color,
              icon: (
                <IconExclamationMark
                  style={{ width: '20rem', height: '20rem' }}
                />
              ),
            });
          }
        }
      },
      onCancel: () => (url = ''),
    });

  // const urlLists = editor?.getJSON()?.content.reduce(
  //   (acc, curr) => {
  //     if (curr?.type === 'youtube') return [...acc, curr?.attrs?.src];
  //     return acc;
  //   },
  //   [] as Array<string | null>,
  // );

  // editor.getHTML().replace(EMPTY_YOUTUBE_HTML, newUrl(urlLists.pop()) || '');
  return (
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

        <Tooltip label='add youtube' position='bottom'>
          <Button
            variant='default'
            className='yt_btn'
            style={{ width: '26px', height: '26px', padding: 0 }}
          >
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
      <RichTextEditor.Content style={{ minHeight: '20em' }} />
    </RichTextEditor>
  );
};

export default TipTapTextEditor;
