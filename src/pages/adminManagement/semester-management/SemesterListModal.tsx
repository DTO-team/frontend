import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import { Icon } from '@iconify/react';
import { Box, Grid, Typography } from '@material-ui/core';
import { Semester } from '../../../@types/management';
import ActionModal from 'components/modal/ActionModal';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getSemesterList, updateSemesterStatus } from 'redux/slices/management';
import { RootState, useDispatch } from 'redux/store';
import palette from 'theme/palette';
import { SemesterStatus } from 'utils/enum-utils';
import AlertDialog from 'components/dialog/AlertDialog';
import SemesterTimeSelectModal from './SemesterTimeSelectModal';

interface ISemesterListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChangeSelectedSemester: (selectedSemester: Semester | null) => void;
}

export default function SemesterListModal(props: ISemesterListModalProps) {
  const { isOpen, onClose, onChangeSelectedSemester } = props;
  /* const [isOpenSelectedDateDialog, setIsOpenSelectedDateDialog] = useState(false); */
  /* const [currentUpdateSemester, setCurrentUpdateSemester] = useState<Semester>(); */
  const dispatch = useDispatch();
  const { semesters } = useSelector((state: RootState) => state.management);

  const _handleClassifyStatusColor = (status: number) => {
    let bgColor;
    let statusTextColor;
    let statusName;
    switch (status) {
      case SemesterStatus.PREPARING: {
        bgColor = palette.light.success.light;
        statusTextColor = palette.dark.success.darker;
        statusName = 'Preparing';
        break;
      }
      case SemesterStatus.ON_GOING: {
        bgColor = palette.light.info.lighter;
        statusTextColor = palette.light.info.darker;
        statusName = 'On Going';
        break;
      }
      case SemesterStatus.ENDED: {
        bgColor = palette.light.error.lighter;
        statusTextColor = palette.light.error.darker;
        statusName = 'Ended';
        break;
      }
    }

    return { bgColor, statusTextColor, statusName };
  };

  const _handleChangeStatusForSemester = (selectedSemester: Semester | null) => {
    onChangeSelectedSemester(selectedSemester);
  };

  /* const _handleCloseDialog = () => {
    setIsOpenSelectedDateDialog(false);
  }; */

  useEffect(() => {
    async function getData() {
      await getSemesterList();
    }
    getData();
  }, [dispatch]);

  return (
    <>
      <ActionModal
        isOpen={isOpen}
        onClose={onClose}
        title="Semester Management"
        children={
          <Grid container spacing={2}>
            {_.map(semesters, (semester) => {
              const { id, year, season, status } = semester;
              const { bgColor, statusTextColor, statusName } = _handleClassifyStatusColor(status);
              return (
                <Grid item key={id} xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      bgcolor: bgColor,
                      boxShadow: '2px 5px 12px grey'
                    }}
                  >
                    <Typography sx={{ fontWeight: 'bold' }}>{`${year} ${season}`}</Typography>
                    <Box sx={{ display: 'flex' }}>
                      {/* <div
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        onClick={() => _handleChangeStatus(semester, false)}
                      >
                        <Icon icon={arrowIosBackFill} />
                      </div> */}
                      <Typography sx={{ fontWeight: 'bold' }} color={statusTextColor}>
                        {statusName}
                      </Typography>
                      <div
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        onClick={() => {
                          _handleChangeStatusForSemester(semester);
                        }}
                      >
                        <Icon icon={arrowIosForwardFill} />
                      </div>
                    </Box>
                  </Box>
                  {/* Child modal */}
                  {/* <SemesterTimeSelectModal
                    isOpen={isOpenSelectedDateDialog}
                    onClose={_handleCloseDialog}
                    semester={currentUpdateSemester}
                  /> */}
                </Grid>
              );
            })}
          </Grid>
        }
      />
    </>
  );
}
