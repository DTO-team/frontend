import plusOutline from '@iconify/icons-eva/plus-outline';
import Icon from '@iconify/react';
import {
  Autocomplete,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography
} from '@material-ui/core';
import { DatePicker, LoadingButton } from '@material-ui/lab';
import { Box } from '@material-ui/system';
import ActionModal from 'components/modal/ActionModal';
import _ from 'lodash';
import moment from 'moment';
import { useSnackbar } from 'notistack5';
import React, { useEffect, useState } from 'react';
import { getCriteriaList } from 'redux/slices/criteria';
import { updateSemesterStatus } from 'redux/slices/management';
import { ICriteria } from '../../../@types/criterion';
import { Semester } from '../../../@types/management';
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

const updateSemeterInit = {
  id: '',
  status: 0,
  startDayOfSemester: Number(moment().startOf('week').isoWeekday(1).format('X').valueOf()),
  createEvaluationSessionRequests: []
};

interface ICreateEvaluationSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  semester: Semester | undefined;
}

interface IUpdateSemesterPayload {
  id: string;
  status: number;
  startDayOfSemester: number;
  createEvaluationSessionRequests: IEvaluationSessionPayload[];
}
interface IEvaluationSessionPayload {
  sessionName: string;
  round: number;
  isFinal: boolean;
  status: number;
  deadline: any;
  criterias: any[];
}

export default function CreateEvaluationSessionModal({
  isOpen,
  onClose,
  semester
}: ICreateEvaluationSessionModalProps) {
  const { enqueueSnackbar } = useSnackbar();

  const [evaluationPayloadList, setEvaluationPayloadList] = useState<IEvaluationSessionPayload[]>(
    []
  );
  const [updateSemesterPayload, setUpdateSemesterPayload] =
    useState<IUpdateSemesterPayload>(updateSemeterInit);
  const [availableCriterions, setAvailableCriterions] = useState<ICriteria[]>([]);

  function _disableDayNotMonday(date: any) {
    return date.getDay() !== 1;
  }

  const _handleAddMoreEvaluation = () => {
    const newEvaluationList = _.cloneDeep(evaluationPayloadList);
    let numberOfEvalution = evaluationPayloadList.length + 1;
    const newEvaluationData: IEvaluationSessionPayload = {
      sessionName: `Evaluation Number ${numberOfEvalution}`,
      isFinal: false,
      round: numberOfEvalution,
      deadline: moment().format('X').valueOf(),
      status: 1,
      criterias: []
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

  const _handleChangeCriteriaValue = (evaluationIndex: number, newCriterionList: ICriteria[]) => {
    let newEvaluationList = _.cloneDeep(evaluationPayloadList);
    if (!newEvaluationList.length) return;
    const evaluationNeedUpdate = _.find(
      evaluationPayloadList,
      (evaluation, index) => index === evaluationIndex
    );
    if (!evaluationNeedUpdate) return;
    const newCriteriaData = _.map(newCriterionList, (criteria) => {
      return {
        id: criteria.id,
        code: criteria.code,
        name: criteria.name,
        evaluation: criteria.evaluation
      };
    });
    evaluationNeedUpdate.criterias = newCriteriaData;
    newEvaluationList.splice(evaluationIndex, 1, evaluationNeedUpdate);
    setEvaluationPayloadList(newEvaluationList);
  };

  const _handleChangeDeadlineValue = (evaluationIndex: number, newDate: any) => {
    let newEvaluationList = _.cloneDeep(evaluationPayloadList);
    if (!newEvaluationList.length) return;
    const evaluationNeedUpdate = _.find(
      evaluationPayloadList,
      (evaluation, index) => index === evaluationIndex
    );
    if (!evaluationNeedUpdate) return;
    evaluationNeedUpdate.deadline = moment(newDate).format('X').valueOf();
    newEvaluationList.splice(evaluationIndex, 1, evaluationNeedUpdate);
    setEvaluationPayloadList(newEvaluationList);
  };

  const _handleChangeIsFinalStatus = (evaluationIndex: number, value: any) => {
    let newEvaluationList = _.cloneDeep(evaluationPayloadList);
    if (!newEvaluationList.length) return;
    const evaluationNeedUpdate = _.find(
      evaluationPayloadList,
      (evaluation, index) => index === evaluationIndex
    );
    if (!evaluationNeedUpdate) return;
    evaluationNeedUpdate.isFinal = value;
    newEvaluationList.splice(evaluationIndex, 1, evaluationNeedUpdate);
    setEvaluationPayloadList(newEvaluationList);
  };

  const _handleChangeStartDayOfSemester = (newDate: any) => {
    const newSemesterPayload = _.cloneDeep(updateSemesterPayload);
    newSemesterPayload.startDayOfSemester = Number(moment(newDate).format('X').valueOf());
    setUpdateSemesterPayload(newSemesterPayload);
  };

  const _handleUpdateSemesterWithEvaluationSessions = async () => {
    const evaluationSessions = _.cloneDeep(evaluationPayloadList);
    const payload = _.cloneDeep(updateSemesterPayload);
    payload.createEvaluationSessionRequests = evaluationSessions;
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

  useEffect(() => {
    async function getData() {
      const criterions = await getCriteriaList();
      if (criterions) setAvailableCriterions(criterions);
    }
    getData();
  }, []);

  useEffect(() => {
    const newSemesterPayload = _.cloneDeep(updateSemesterPayload);
    if (semester) {
      newSemesterPayload.id = semester.id;
      newSemesterPayload.status = semester.status + 1;
    }
    setUpdateSemesterPayload(newSemesterPayload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [semester]);

  return (
    <ActionModal
      isOpen={isOpen}
      onClose={onClose}
      boxStyleOverride={boxStyleOverride}
      title="Create Evaluation Session for Semester"
      children={
        <Box sx={{ minWidth: 1000, maxWidth: 1000, minHeight: 600, position: 'relative' }}>
          <Card sx={{ my: 3, p: 2 }}>
            <Typography sx={{ mb: 2 }}>
              You are about to update status of the semster {semester?.season}_{semester?.year} to{' '}
              <b>{semester?.status === SemesterStatus.PREPARING ? 'PREPARING' : 'ENDED'}</b>
              <br />
              Make sure you check all correctively, this action can't be undone.
            </Typography>
            {semester?.status === SemesterStatus.PREPARING && (
              <>
                <DatePicker
                  label="Select Semester Start Date"
                  shouldDisableDate={_disableDayNotMonday}
                  value={moment.unix(updateSemesterPayload.startDayOfSemester).toDate()}
                  onChange={(newValue) => {
                    _handleChangeStartDayOfSemester(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <Typography variant="body2" color="red">
                  *Please note that only Monday can be selected to change status of the semester
                </Typography>
              </>
            )}
          </Card>

          <Box>
            {_.map(evaluationPayloadList, (evaluation, index) => {
              const { sessionName, round, status, deadline, isFinal } = evaluation;
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
                      <Box sx={{ ml: 2 }} component="span">
                        <DatePicker
                          label="Select Deadline"
                          value={moment.unix(deadline).toDate()}
                          onChange={(newValue) => {
                            _handleChangeDeadlineValue(index, newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Box>
                      <FormControl sx={{ ml: 2, pt: 1 }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isFinal}
                              onChange={(e) => {
                                _handleChangeIsFinalStatus(index, e.target.checked);
                              }}
                            />
                          }
                          label="Is Final Session"
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <Autocomplete
                          multiple
                          id={`update-criteria-${index}`}
                          options={availableCriterions}
                          getOptionLabel={(option) => option.name}
                          onChange={(event: any, value) => {
                            _handleChangeCriteriaValue(index, value);
                          }}
                          filterSelectedOptions
                          renderInput={(params) => <TextField {...params} label="Add criteria" />}
                          renderOption={(props, option) => {
                            return (
                              <Box component={'li'} {...props}>
                                <Tooltip
                                  title={
                                    <React.Fragment>
                                      Question of criteria:
                                      {_.map(option.questions, (question, questionIndex) => {
                                        return (
                                          <Box>
                                            <Typography component={'div'} variant="body2">
                                              {questionIndex + 1}- {question.description}
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
              disabled={semester?.status !== SemesterStatus.PREPARING}
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
              onClick={_handleUpdateSemesterWithEvaluationSessions}
            >
              Update
            </LoadingButton>
          </Box>
        </Box>
      }
    />
  );
}
