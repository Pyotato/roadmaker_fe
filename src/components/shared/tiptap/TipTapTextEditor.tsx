import { Button, Tooltip } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { IconBrandYoutubeFilled } from '@tabler/icons-react';
import { Editor } from '@tiptap/react';

const TipTapTextEditor = ({ editor }: { editor: Editor | null }) => {
  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL');

    if (editor && url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
      });
    }
  };

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
              onClick={addYoutubeVideo}
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
