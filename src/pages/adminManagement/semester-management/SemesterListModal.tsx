import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import { Icon } from '@iconify/react';
import { Box, Grid, Typography } from '@material-ui/core';
import ActionModal from 'components/modal/ActionModal';
import _ from 'lodash';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getSemesterList } from 'redux/slices/management';
import { RootState, useDispatch } from 'redux/store';
import palette from 'theme/palette';
import { SemesterStatus } from 'utils/enum-utils';
import { Semester } from '../../../@types/management';
import eyeFill from '@iconify/icons-eva/eye-fill';
import externalLinkFill from '@iconify/icons-eva/external-link-fill';
interface ISemesterListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChangeSelectedSemester: (selectedSemester: Semester | null) => void;
  isReviewSemester: boolean;
}

export default function SemesterListModal(props: ISemesterListModalProps) {
  const { isOpen, onClose, onChangeSelectedSemester, isReviewSemester } = props;
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
  }, []);

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
                      {isReviewSemester ? (
                        <>
                          <div
                            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                            onClick={() => {
                              _handleChangeStatusForSemester(semester);
                            }}
                          >
                            <Icon icon={externalLinkFill  } />
                          </div>
                        </>
                      ) : (
                        <>
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
                        </>
                      )}
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
