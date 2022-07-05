import {
  Card,
  CardHeader,
  Divider,
  FormControl,
  Modal,
  TextField,
  Typography
} from '@material-ui/core';
import { Box } from '@material-ui/system';
import { QuillEditor } from 'components/editor';
import Scrollbar from 'components/Scrollbar';

interface IWeeklyReportModalContentProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '5%',
  left: '50%',
  transform: 'translate(-50%, 0%)',
  minWidth: '60%',
  maxWidth: '80%',
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  p: 4
};

export default function WeeklyReportModalContent(props: IWeeklyReportModalContentProps) {
  const { children, isOpen, onClose, title } = props;
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{ invisible: true }}
      sx={{
        backdropFilter: 'blur(1px)',
        overflowY: 'auto'
      }}
    >
      <Box sx={{ ...style, overflow: 'auto' }}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          Send new report
        </Typography>
        <Divider />
        <Box sx={{ mt: 3, display: 'flex', justifyItems: 'center' }}>
          <Scrollbar>
            <Box>Team section, datepicker</Box>
            <FormControl>
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" fontWeight={'bold'} sx={{ mb: 0.5 }}>
                  Task completed
                </Typography>
                <QuillEditor
                  id="taskcompleted"
                  sx={{ width: 'full' }}
                  onChange={(value) => {
                    console.log('value 1', value);
                  }}
                />
              </Box>

              <Divider />
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" fontWeight={'bold'} sx={{ mb: 0.5 }}>
                  Tasks in-progress
                </Typography>
                <QuillEditor
                  id="inprogresstask"
                  sx={{ width: 'full' }}
                  onChange={(value) => {
                    console.log('value 1', value);
                  }}
                />
              </Box>

              <Divider />
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" fontWeight={'bold'} sx={{ mb: 0.5 }}>
                  Tasks to begin next week
                </Typography>
                <QuillEditor
                  id="nextweektask"
                  sx={{ width: 'full' }}
                  onChange={(value) => {
                    console.log('value 1', value);
                  }}
                />
              </Box>

              <Divider />
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" fontWeight={'bold'} sx={{ mb: 0.5 }}>
                  Urgent issues
                </Typography>
                <QuillEditor
                  id="urgentissues"
                  sx={{ width: 'full' }}
                  onChange={(value) => {
                    console.log('value 1', value);
                  }}
                />
              </Box>

              <Divider />
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" fontWeight={'bold'} sx={{ mb: 0.5 }}>
                  Self-assessments
                </Typography>
                <QuillEditor
                  id="selfassessments"
                  sx={{ width: 'full' }}
                  onChange={(value) => {
                    console.log('value 1', value);
                  }}
                />
              </Box>
            </FormControl>

            <Box sx={{ display: 'flex-column' }}></Box>
          </Scrollbar>
        </Box>
      </Box>
    </Modal>
  );
}
