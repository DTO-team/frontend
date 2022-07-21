import { Box, Button } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { QuillEditor } from 'components/editor';
import ActionModal from 'components/modal/ActionModal';
import { useSnackbar } from 'notistack5';
import { useState } from 'react';
import { createReportFeedback } from 'redux/slices/team';
import { IReport } from '../../../@types/report';

interface ICreateReportFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedReport: IReport | undefined;
}

/* const content =
  '<p style="user-select: auto;"><strong style="user-select: auto;">Phần này nè: </strong></p><p style="user-select: auto;"><span style="font-size: 14px; user-select: auto;">Trong xuất bản và thiết kế đồ họa, Lorem ipsum là văn bản giữ chỗ thường được sử dụng để thể hiện hình thức trực quan của tài liệu hoặc kiểu chữ mà không dựa trên nội dung có ý nghĩa. Lorem ipsum có thể được sử dụng làm trình giữ chỗ trước khi có bản sao cuối cùng</span></p><p style="user-select: auto;"><br style="user-select: auto;"></p><p style="user-select: auto;"><em style="font-size: 14px;">Trong xuất bản và thiết kế đồ họa, Lorem ipsum là văn bản giữ chỗ thường được sử dụng để thể hiện hình thức trực quan của tài liệu hoặc kiểu chữ mà không dựa trên nội dung có ý nghĩa. Lorem ipsum có thể được sử dụng làm trình giữ chỗ trước khi có bản sao cuối cùng</em></p>';
 */
export default function CreateReportFeedbackModal({
  isOpen,
  onClose,
  selectedReport
}: ICreateReportFeedbackModalProps) {
  const [feedbackContent, setFeedbackContent] = useState<string>();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const _handleAddFeedback = async () => {
    if (selectedReport === undefined) return;
    const payload = {
      teamId: selectedReport.reporter.teamId,
      reportId: selectedReport.id,
      value: feedbackContent
    };
    const response = await createReportFeedback(payload);
    if (response !== undefined) {
      enqueueSnackbar('Add feedback successfully', {
        variant: 'success'
      });
      onClose();
    } else {
      enqueueSnackbar('Oops! Something went wrong, please try again later', {
        variant: 'error'
      });
    }
  };

  return (
    <ActionModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Report Feedbacks"
      children={
        <Box sx={{ width: 1000 }}>
          <QuillEditor
            id={`feedback`}
            sx={{ width: 'full' }}
            value={feedbackContent}
            simple={true}
            onChange={(value) => {
              setFeedbackContent(value);
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
            <Button variant="outlined" sx={{ mr: 2 }} onClick={onClose}>
              Close
            </Button>
            <Button variant="contained" onClick={_handleAddFeedback}>
              Add Feedback
            </Button>
          </Box>
        </Box>
      }
    />
  );
}
