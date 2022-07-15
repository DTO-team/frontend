import plusOutline from '@iconify/icons-eva/plus-outline';
import Icon from '@iconify/react';
import {
  Autocomplete,
  Button,
  Card,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Tooltip,
  Typography
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { Box } from '@material-ui/system';
import ActionModal from 'components/modal/ActionModal';
import _ from 'lodash';
import { options } from 'numeral';
import React, { useEffect, useState } from 'react';
import criteria, { getCriteriaList } from 'redux/slices/criteria';
import { ICriteria } from '../../../@types/criterion';
import { SemesterStatus } from '../../../utils/enum-utils';

const boxStyleOverride = {
  position: 'absolute' as 'absolute',
  top: '10%',
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

const STATUS_LIST = [
  {
    value: SemesterStatus.PREPARING,
    statusName: 'Preparing'
  },
  {
    value: SemesterStatus.ON_GOING,
    statusName: 'On Going'
  },
  {
    value: SemesterStatus.ENDED,
    statusName: 'Ended'
  }
];

interface ICreateEvaluationSessionModal {
  isOpen: boolean;
  onClose: () => void;
}

interface IEvaluationSessionPayload {
  sessionName: string;
  semesterId: string;
  round: number;
  status: number;
  criteriaList: { criteriaId: string; criteriaName: string }[];
}

export default function CreateEvaluationSessionModal({
  isOpen,
  onClose
}: ICreateEvaluationSessionModal) {
  const [evaluationPayloadList, setEvaluationPayloadList] = useState<IEvaluationSessionPayload[]>(
    []
  );
  const [availableCriterions, setAvailableCriterions] = useState<ICriteria[]>([]);

  const _handleAddMoreEvaluation = () => {
    const newEvaluationList = _.cloneDeep(evaluationPayloadList);
    let numberOfEvalution = evaluationPayloadList.length + 1;
    const newEvaluationData: IEvaluationSessionPayload = {
      sessionName: `Evaluation Number ${numberOfEvalution}`,
      semesterId: '',
      round: numberOfEvalution,
      status: 1,
      criteriaList: []
    };
    newEvaluationList.push(newEvaluationData);
    setEvaluationPayloadList(newEvaluationList);
  };

  const _handleChangeStatusValue = (evaluationIndex: number, statusValue: number) => {
    let newEvaluationList = _.cloneDeep(evaluationPayloadList);
    if (!newEvaluationList.length) return;
    const evaluationNeedUpdate = _.find(
      evaluationPayloadList,
      (evaluation, index) => index === evaluationIndex
    );
    if (!evaluationNeedUpdate) return;
    evaluationNeedUpdate.status = statusValue;
    newEvaluationList.splice(evaluationIndex, 1, evaluationNeedUpdate);
    setEvaluationPayloadList(newEvaluationList);
  };

  const _handleChangeCriteriaValue = (evaluationIndex: number, newCriteriaIds: any) => {
    let newEvaluationList = _.cloneDeep(evaluationPayloadList);
    if (!newEvaluationList.length) return;
    const evaluationNeedUpdate = _.find(
      evaluationPayloadList,
      (evaluation, index) => index === evaluationIndex
    );
    if (!evaluationNeedUpdate) return;
    let newCriteriaList: { criteriaId: string; criteriaName: string }[] = [];
    _.forEach(newCriteriaIds, (newCriteriaId) => {
      const data = _.find(
        availableCriterions,
        (currentCriteria) => currentCriteria.id === newCriteriaId
      );
      if (data) newCriteriaList.push({ criteriaId: data.id, criteriaName: data.name });
    });
    evaluationNeedUpdate.criteriaList = newCriteriaList;
    newEvaluationList.splice(evaluationIndex, 1, evaluationNeedUpdate);
    setEvaluationPayloadList(newEvaluationList);
  };

  useEffect(() => {
    async function getData() {
      const criterions = await getCriteriaList();
      if (criterions) setAvailableCriterions(criterions);
    }
    getData();
  }, []);

  return (
    <ActionModal
      isOpen={isOpen}
      onClose={onClose}
      boxStyleOverride={boxStyleOverride}
      title="Create Evaluation Session"
      children={
        <Box sx={{ minWidth: 1000, maxWidth: 1000, minHeight: 600, position: 'relative' }}>
          <Box>
            {_.map(evaluationPayloadList, (evaluation, index) => {
              const { sessionName, criteriaList, round, status } = evaluation;
              return (
                <Card key={index} sx={{ my: 3, p: 2 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField value={sessionName} variant="outlined" disabled />

                      <TextField
                        sx={{ width: 120, ml: 2 }}
                        value={`Round ${round}`}
                        variant="outlined"
                        disabled
                      />

                      <FormControl sx={{ width: 120, ml: 2 }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                          labelId={`status-evaluation-select-label-${index}`}
                          id={`status-evaluation-select-${index}`}
                          value={status}
                          label="Status"
                          onChange={(e) => {
                            _handleChangeStatusValue(index, e.target.value);
                          }}
                        >
                          {_.map(STATUS_LIST, (status) => (
                            <MenuItem value={status.value}>
                              <Tooltip
                                title={
                                  <React.Fragment>
                                    <Typography>
                                      Round: Hello Round {status.value} is here
                                    </Typography>
                                    <Typography>Story: This is explain sesssion</Typography>
                                  </React.Fragment>
                                }
                                placement="top"
                              >
                                <Typography sx={{ width: '100%' }}>{status.statusName}</Typography>
                              </Tooltip>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <Autocomplete
                          multiple
                          id={`update-criteria-${index}`}
                          options={availableCriterions}
                          getOptionLabel={(option) => option.name}
                          onChange={(event: any, value) => {}}
                          filterSelectedOptions
                          renderInput={(params) => <TextField {...params} label="Add criteria" />}
                          renderOption={(props, option) => {
                            return (
                              <Box component={'li'} {...props}>
                                <Tooltip
                                  title={
                                    <React.Fragment>
                                      Question of criteria:
                                      {_.map(option.questions, (question) => {
                                        return (
                                          <Box>
                                            <Typography component={'div'} variant="body2">
                                              {question.description}
                                            </Typography>
                                            <br />
                                          </Box>
                                        );
                                      })}
                                    </React.Fragment>
                                  }
                                  placement="right"
                                >
                                  <Typography>{option.name}</Typography>
                                </Tooltip>
                              </Box>
                            );
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Card>
              );
            })}
            <Button
              variant="outlined"
              startIcon={<Icon icon={plusOutline} />}
              sx={{ width: '100%' }}
              onClick={_handleAddMoreEvaluation}
            >
              Add Evaluation Session
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              mt: 2
            }}
          >
            <Button variant="outlined" sx={{ mr: 1 }} onClick={onClose}>
              Discard
            </Button>
            <LoadingButton
              sx={{ px: 3 }}
              loading={false}
              type="submit"
              variant="contained"
              onClick={() => {}}
            >
              Create
            </LoadingButton>
          </Box>
        </Box>
      }
    />
  );
}
