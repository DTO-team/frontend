import { Box, Button, TextField, Typography } from '@material-ui/core';
import { DatePicker } from '@material-ui/lab';
import { Semester } from '../../../@types/management';
import ActionModal from 'components/modal/ActionModal';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSemesterStatus } from 'redux/slices/management';
import { SemesterStatus } from 'utils/enum-utils';
import { useSnackbar } from 'notistack5';
import moment from 'moment';

interface ISemesterTimeSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  semester: Semester | undefined;
}

export default function SemesterTimeSelectModal({
  isOpen,
  onClose,
  semester
}: ISemesterTimeSelectModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const _handleChangeStatus = async (semester: Semester | undefined) => {
    let payload = {
      id: semester?.id,
      status: 0,
      startDayOfSemester: moment(selectedDate).format('X').valueOf()
    };
    if (selectedDate === null) {
      enqueueSnackbar('Please select a Date', { variant: 'error' });
      return;
    }
    switch (semester?.status) {
      case SemesterStatus.PREPARING: {
        payload.status = SemesterStatus.ON_GOING;
        break;
      }
      case SemesterStatus.ON_GOING: {
        payload.status = SemesterStatus.ENDED;
        break;
      }
    }
    try {
      const response = await updateSemesterStatus(payload);
      if (response !== undefined) {
        enqueueSnackbar('Updated semester status', { variant: 'success' });
        onClose();
      } else {
        enqueueSnackbar('Oops! Something went wrong, please try again later', { variant: 'error' });
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  function _disableDayNotMonday(date: any) {
    return date.getDay() !== 1;
  }

  return (
    <ActionModal
      isChildModal={true}
      isOpen={isOpen}
      onClose={onClose}
      title="Select time for semester"
      children={
        <Box>
          <Typography sx={{ mb: 2 }}>
            You are about to update status of the semster. <br />
            Make sure you check all correctively, this action can't be undone.
          </Typography>
          <DatePicker
            label="Select time"
            value={selectedDate}
            shouldDisableDate={_disableDayNotMonday}
            onChange={(newValue) => {
              setSelectedDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <Typography variant="body2" color="red" sx={{ mb: 3 }}>
            *Please note that only Monday can be selected to change status of the semester
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
            <Button variant="outlined" sx={{ mr: 2 }} onClick={onClose}>
              Discard
            </Button>
            <Button
              type="submit"
              variant="contained"
              onClick={() => {
                _handleChangeStatus(semester);
              }}
            >
              Update
            </Button>
          </Box>
        </Box>
      }
    />
  );
}
