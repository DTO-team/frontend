import { Box, Grid, Typography } from '@material-ui/core';
import { Semester } from '../../../@types/management';
import ItemCard from 'components/card/ItemCard';
import { useState } from 'react';
import CreateEvaluationSessionModal from '../evaluation-session/CreateEvaluationSessionModal';
import SemesterListModal from '../semester-management/SemesterListModal';

export default function SettingList() {
  const [isOpenSemesterManagement, setIsOpenSemesterManagement] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<any>();
  const [isOpenCreateEvaluation, setIsOpenCreateEvaluation] = useState(false);
  const [isReviewSemester, setIsReviewSemester] = useState(false);

  const _handleOpenSemesterManagement = (isReviewSemester: boolean) => {
    setIsReviewSemester(isReviewSemester);
    setIsOpenSemesterManagement(true);
  };

  const onClose = () => {
    setIsOpenSemesterManagement(false);
    setIsOpenCreateEvaluation(false);
  };

  const onSelectSemesterToUpdate = (selectedSemester: Semester | null) => {
    setSelectedSemester(selectedSemester);
    setIsOpenSemesterManagement(false);
    setIsOpenCreateEvaluation(true);
  };

  return (
    <>
      {isOpenSemesterManagement && (
        <SemesterListModal
          onChangeSelectedSemester={onSelectSemesterToUpdate}
          isOpen={isOpenSemesterManagement}
          onClose={onClose}
          isReviewSemester={isReviewSemester}
        />
      )}

      {isOpenCreateEvaluation && (
        <CreateEvaluationSessionModal
          semester={selectedSemester}
          isOpen={isOpenCreateEvaluation}
          onClose={onClose}
          isReviewSemester={isReviewSemester}
        />
      )}

      <Box sx={{ m: 8 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Admin management settings:{' '}
        </Typography>
        <Grid container rowSpacing={2} columnSpacing={0}>
          <Grid item xs={3}>
            <ItemCard
              onClick={() => {
                _handleOpenSemesterManagement(false);
              }}
              title="Semester Status Management"
              description="Management the semester status"
            />
          </Grid>

          <Grid item xs={3}>
            <ItemCard
              onClick={() => {
                _handleOpenSemesterManagement(true);
              }}
              title="Review Semester"
              description="Review the whole semester"
            />
          </Grid>
          <Grid item xs={3}>
            <ItemCard onClick={() => {}} title="Week Management" description="Management week " />
          </Grid>

          <Grid item xs={3}>
            <ItemCard
              onClick={() => {}}
              title="Import topics / students"
              description="Import topics or students for the semester"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
