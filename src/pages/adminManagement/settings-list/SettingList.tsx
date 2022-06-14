import { Box, Grid, Typography } from '@material-ui/core';
import ItemCard from 'components/card/ItemCard';
import { useState } from 'react';
import SemesterListModal from '../semester-management/SemesterListModal';

export default function SettingList() {
  const [isOpenSemesterManagement, setIsOpenSemesterManagement] = useState(false);
  const _handleOpenSemesterManagement = () => {
    console.log('open');
    setIsOpenSemesterManagement(true);
  };

  const onClose = () => {
    setIsOpenSemesterManagement(false);
  };

  return (
    <>
      {isOpenSemesterManagement && (
        <SemesterListModal isOpen={isOpenSemesterManagement} onClose={onClose} />
      )}

      <Box sx={{ m: 8 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Admin management settings:{' '}
        </Typography>
        <Grid container rowSpacing={2} columnSpacing={0}>
          <Grid item xs={3}>
            <ItemCard
              onClick={() => _handleOpenSemesterManagement()}
              title="Semester Management"
              description="Management the semester status"
            />
          </Grid>
          <Grid item xs={3}>
            <ItemCard title="Semester Management" description="Management the semester status" />
          </Grid>
          <Grid item xs={3}>
            <ItemCard title="Semester Management" description="Management the semester status" />
          </Grid>
          <Grid item xs={3}>
            <ItemCard title="Semester Management" description="Management the semester status" />
          </Grid>
          <Grid item xs={3}>
            <ItemCard title="Semester Management" description="Management the semester status" />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
