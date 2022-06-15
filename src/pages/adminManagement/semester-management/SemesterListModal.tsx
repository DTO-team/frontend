import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import { Icon } from '@iconify/react';
import { Box, Grid, Typography } from '@material-ui/core';
import ActionModal from 'components/modal/ActionModal';
import _ from 'lodash';

interface ISemesterListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const fakes = [
  { id: 1, year: 2022, season: 'SPRING', status: 'ON_GOING' },
  { id: 2, year: 2022, season: 'FALL', status: 'ON_GOING' },
  { id: 3, year: 2022, season: 'SUMMER', status: 'ON_GOING' }
];

export default function SemesterListModal(props: ISemesterListModalProps) {
  const { isOpen, onClose } = props;
  const bgColor = '#80bcf991';
  const statusBorderColor = '#80bcf9d9';
  return (
    <ActionModal
      isOpen={isOpen}
      onClose={onClose}
      title="Semester Management"
      children={
        <Grid container spacing={2}>
          {_.map(fakes, (fake) => {
            const { id, year, season, status } = fake;
            return (
              <Grid item key={id} xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    border: 2,
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    borderColor: statusBorderColor,
                    bgcolor: bgColor
                  }}
                >
                  <Typography sx={{ fontWeight: 'bold' }}>{`${year} ${season}`}</Typography>
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      <Icon icon={arrowIosBackFill} />
                    </Box>
                    <Typography sx={{ fontWeight: 'bold' }}>{status}</Typography>
                    <Box sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      <Icon icon={arrowIosForwardFill} />
                    </Box>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      }
    />
  );
}
