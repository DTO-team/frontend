import { Editor, EditorProps } from 'react-draft-wysiwyg';
import { BoxProps } from '@material-ui/core';
import { editorToolbar } from './DraftEditorToolbar';
import DraftEditorStyle from './DraftEditorStyle';

// ----------------------------------------------------------------------

interface DraftEditorProps extends EditorProps {
  sx?: BoxProps;
}

export default function DraftEditor({ sx, ...other }: DraftEditorProps) {
  return (
    <DraftEditorStyle sx={sx}>
      <Editor toolbar={editorToolbar} placeholder="Write something awesome..." {...other} />
    </DraftEditorStyle>
  );
}
