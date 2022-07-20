import { Box, Button, Card, Divider, Grid, Typography } from '@material-ui/core';
import Label from 'components/Label';
import ActionModal from 'components/modal/ActionModal';
import { sentenceCase } from 'change-case';
import { useTheme } from '@material-ui/core/styles';
import React from 'react';
import palette from 'theme/palette';
import { QuillEditor } from 'components/editor';
import { IFeedback } from '../../../@types/feedback';
import _ from 'lodash';
import moment from 'moment';

const boxStyleOverride = {
  position: 'absolute' as 'absolute',
  top: '5%',
  left: '50%',
  transform: 'translate(-50%, 0%)',
  minWidth: 600,
  maxWidth: '100%',
  overflow: 'auto',
  width: 'fit-content',
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  p: 4
};

interface IViewMentorFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  feedbackList: IFeedback[];
}

/* const content =
  '<p style="user-select: auto;"><strong style="user-select: auto;">Phần này nè: </strong></p><p style="user-select: auto;"><span style="font-size: 14px; user-select: auto;">Trong xuất bản và thiết kế đồ họa, Lorem ipsum là văn bản giữ chỗ thường được sử dụng để thể hiện hình thức trực quan của tài liệu hoặc kiểu chữ mà không dựa trên nội dung có ý nghĩa. Lorem ipsum có thể được sử dụng làm trình giữ chỗ trước khi có bản sao cuối cùng</span></p><p style="user-select: auto;"><br style="user-select: auto;"></p><p style="user-select: auto;"><em style="font-size: 14px;">Trong xuất bản và thiết kế đồ họa, Lorem ipsum là văn bản giữ chỗ thường được sử dụng để thể hiện hình thức trực quan của tài liệu hoặc kiểu chữ mà không dựa trên nội dung có ý nghĩa. Lorem ipsum có thể được sử dụng làm trình giữ chỗ trước khi có bản sao cuối cùng</em></p>';
 */
export default function ViewMentorFeedbackModal({
  isOpen,
  onClose,
  feedbackList
}: IViewMentorFeedbackModalProps) {
  const theme = useTheme();

  return (
    <ActionModal
      isOpen={isOpen}
      onClose={onClose}
      boxStyleOverride={boxStyleOverride}
      title="View Mentor Feedbacks"
      children={
        <Box sx={{ width: 1000 }}>
          {_.map(feedbackList, (feedback) => {
            const { author, content, createdDateTime, id } = feedback;
            return (
              <Card key={id} sx={{ p: 2, mb: 2 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box sx={{ mb: 2 }}>
                      <Typography fontWeight={'bold'}>{author.fullName}</Typography>
                      <Typography variant="subtitle1" color="text.primary">
                        <Label
                          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                          color={'info'}
                        >
                          {sentenceCase(author.department ? author.department.name : '')}
                        </Label>
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        fontStyle={'italic'}
                        fontWeight="normal"
                        color={palette.light.grey[500]}
                        sx={{ mt: 0.5 }}
                      >
                        {moment.unix(createdDateTime).format('dddd, MMMM Do, YYYY h:mm:ss A')}
                      </Typography>
                    </Box>
                    <Divider />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography fontWeight={'bold'}>Feedback:</Typography>
                    <QuillEditor
                      id={`feedback-${id}`}
                      sx={{ width: 'full' }}
                      value={content}
                      simple={true}
                      readOnly={true}
                    />
                  </Grid>
                </Grid>
              </Card>
            );
          })}
          <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
            <Button variant="outlined" sx={{ mr: 2 }} onClick={onClose}>
              Close
            </Button>
          </Box>
        </Box>
      }
    />
  );
}
