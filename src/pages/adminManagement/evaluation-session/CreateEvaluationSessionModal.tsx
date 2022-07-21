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
import criteria, { getCriteriaList } from 'redux/slices/criteria';
import { getLecturerList } from 'redux/slices/lecturer';
import {
  getEvaluationSessionBySemesterId,
  updateEvaluationsCouncil,
  updateSemesterStatus
} from 'redux/slices/management';
import { getProjectList } from 'redux/slices/project';
import { ICriteria } from '../../../@types/criterion';
import { Semester } from '../../../@types/management';
import { SemesterStatus } from '../../../utils/enum-utils';
import CreateConcil from './CreateConcil';

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
    statusName: 'Not Started'
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
  isReviewSemester: boolean;
}

interface IUpdateSemesterPayload {
  id: string;
  status: number;
  startDayOfSemester: number;
  createEvaluationSessionRequests: IEvaluationSessionPayload[];
}

interface ICreateConcilRequest {
  id: string;
  status: number;
  createCouncilRequest: {
    projectId: string[];
    lecturerId: string[];
  };
}
interface IEvaluationSessionPayload {
  id?: string;
  sessionName: string;
  round: number;
  isFinal: boolean;
  status: number;
  deadline: any;
  criterias: any[];
  createCouncilRequest?: {
    projectId?: any[];
    lecturerId?: any[];
  };
}

export default function CreateEvaluationSessionModal({
  isOpen,
  onClose,
  semester,
  isReviewSemester
}: ICreateEvaluationSessionModalProps) {
  const { enqueueSnackbar } = useSnackbar();

  const [evaluationPayloadList, setEvaluationPayloadList] = useState<IEvaluationSessionPayload[]>(
    []
  );
  const [updateSemesterPayload, setUpdateSemesterPayload] =
    useState<IUpdateSemesterPayload>(updateSemeterInit);
  const [availableCriterions, setAvailableCriterions] = useState<ICriteria[]>([]);
  const [projectList, setProjectList] = useState<any[]>([]);
  const [lecturerList, setLecturerList] = useState<any[]>([]);

  function _disableDayNotMonday(date: any) {
    return date.getDay() !== 1;
  }

  const findEvaluationNeedUpdate = (evaluationIndex: number) => {
    return _.find(evaluationPayloadList, (evaluation, index) => index === evaluationIndex);
  };

  const updateEvaluationSessionListPayload = (
    newEvaluationList: IEvaluationSessionPayload[],
    evaluationIndex: number,
    newPayloadData: IEvaluationSessionPayload
  ) => {
    newEvaluationList.splice(evaluationIndex, 1, newPayloadData);
    setEvaluationPayloadList(newEvaluationList);
  };

  const _handleLoadDataEvaluationList = (evaluationDataList: any) => {
    let newDataForSet: IEvaluationSessionPayload[];
    newDataForSet = _.map(evaluationDataList, (evaluation, index) => {
      const lecturerIds = _.map(evaluation.lecturerInCouncils, (lecturer) => lecturer.id);
      const projectIds = _.map(evaluation.projects, (project) => project.projectId);
      let returnObject: any = {
        id: evaluation.id,
        sessionName: `Session number ${index + 1}`,
        round: evaluation.round,
        isFinal: evaluation.isFinal,
        status: evaluation.status,
        deadline: evaluation.deadLine,
        criterias: evaluation.semesterCriterias
      };
      if (lecturerIds.length !== 0 || projectIds.length !== 0)
        returnObject.createCouncilRequest = {
          lecturerId: lecturerIds.length !== 0 ? lecturerIds : [],
          projectId: projectIds.length !== 0 ? projectIds : []
        };
      return returnObject;
    });
    setEvaluationPayloadList(newDataForSet);
  };

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

  const _handleAddConcil = (evaluationIndex: number) => {
    let newEvaluationList = _.cloneDeep(evaluationPayloadList);
    if (!newEvaluationList.length) return;
    const evaluationNeedUpdate = findEvaluationNeedUpdate(evaluationIndex);
    if (!evaluationNeedUpdate) return;
    evaluationNeedUpdate.createCouncilRequest = {
      projectId: [],
      lecturerId: []
    };
    updateEvaluationSessionListPayload(newEvaluationList, evaluationIndex, evaluationNeedUpdate);
  };

  const _handleCreateCouncilAndChangeStatus = async (selectedEvaluation: any) => {
    const payload = {
      evaluationId: selectedEvaluation.id,
      status: selectedEvaluation.status,
      createCouncilRequest: {
        evaluationSessionId: selectedEvaluation.id,
        projectId: selectedEvaluation.createCouncilRequest.projectId,
        lecturerId: selectedEvaluation.createCouncilRequest.lecturerId
      }
    };
    const response = await updateEvaluationsCouncil(payload);
    if (response !== undefined) {
      enqueueSnackbar('Updated Evaluation', { variant: 'success' });
      const evaluationList = await getEvaluationSessionBySemesterId(semester?.id);
      if (evaluationList !== undefined) {
        _handleLoadDataEvaluationList(evaluationList);
      }
    } else {
      enqueueSnackbar('Oops! Something went wrong, please try again later', { variant: 'error' });
    }
  };

  const _handleChangeStatusValue = (evaluationIndex: number, statusValue: number) => {
    let newEvaluationList = _.cloneDeep(evaluationPayloadList);
    if (!newEvaluationList.length) return;
    const evaluationNeedUpdate = findEvaluationNeedUpdate(evaluationIndex);
    if (!evaluationNeedUpdate) return;
    evaluationNeedUpdate.status = statusValue;
    updateEvaluationSessionListPayload(newEvaluationList, evaluationIndex, evaluationNeedUpdate);
  };

  const _handleChangeCriteriaValue = (evaluationIndex: number, newCriterionList: ICriteria[]) => {
    let newEvaluationList = _.cloneDeep(evaluationPayloadList);
    if (!newEvaluationList.length) return;
    const evaluationNeedUpdate = findEvaluationNeedUpdate(evaluationIndex);
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
    updateEvaluationSessionListPayload(newEvaluationList, evaluationIndex, evaluationNeedUpdate);
  };

  const _handleChangeDeadlineValue = (evaluationIndex: number, newDate: any) => {
    let newEvaluationList = _.cloneDeep(evaluationPayloadList);
    if (!newEvaluationList.length) return;
    const evaluationNeedUpdate = findEvaluationNeedUpdate(evaluationIndex);
    if (!evaluationNeedUpdate) return;
    evaluationNeedUpdate.deadline = moment(newDate).format('X').valueOf();
    updateEvaluationSessionListPayload(newEvaluationList, evaluationIndex, evaluationNeedUpdate);
  };

  const _handleChangeIsFinalStatus = (evaluationIndex: number, value: any) => {
    let newEvaluationList = _.cloneDeep(evaluationPayloadList);
    if (!newEvaluationList.length) return;
    const evaluationNeedUpdate = findEvaluationNeedUpdate(evaluationIndex);
    if (!evaluationNeedUpdate) return;
    evaluationNeedUpdate.isFinal = value;
    updateEvaluationSessionListPayload(newEvaluationList, evaluationIndex, evaluationNeedUpdate);
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

  const _handleChangeLecturerValue = (evaluationIndex: number, newLecturerList: any) => {
    let newEvaluationList = _.cloneDeep(evaluationPayloadList);
    if (!newEvaluationList.length) return;
    const evaluationNeedUpdate = findEvaluationNeedUpdate(evaluationIndex);
    if (!evaluationNeedUpdate || !evaluationNeedUpdate.createCouncilRequest) return;
    evaluationNeedUpdate.createCouncilRequest.lecturerId = _.map(
      newLecturerList,
      (lecturer) => lecturer.id
    );
    updateEvaluationSessionListPayload(newEvaluationList, evaluationIndex, evaluationNeedUpdate);
  };

  const _handleChangeProjectValue = (evaluationIndex: number, newProjectList: any) => {
    let newEvaluationList = _.cloneDeep(evaluationPayloadList);
    if (!newEvaluationList.length) return;
    const evaluationNeedUpdate = findEvaluationNeedUpdate(evaluationIndex);
    if (!evaluationNeedUpdate || !evaluationNeedUpdate.createCouncilRequest) return;
    evaluationNeedUpdate.createCouncilRequest.projectId = _.map(
      newProjectList,
      (project) => project.projectId
    );
    updateEvaluationSessionListPayload(newEvaluationList, evaluationIndex, evaluationNeedUpdate);
  };

  const getAllProjectAndLecturer = async () => {
    const projectsResponse: any = await getProjectList();
    const lecturersRepsonse: any = await getLecturerList();
    projectsResponse !== undefined && setProjectList(projectsResponse);
    lecturersRepsonse !== undefined && setLecturerList(lecturersRepsonse);
  };

  useEffect(() => {
    async function getData() {
      const criterions = await getCriteriaList();
      if (criterions) setAvailableCriterions(criterions);
      if (isReviewSemester) {
        const evaluationList = await getEvaluationSessionBySemesterId(semester?.id);
        if (evaluationList !== undefined) {
          _handleLoadDataEvaluationList(evaluationList);
        }
        await getAllProjectAndLecturer();
      }
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      title={isReviewSemester ? 'Review Semester' : 'Create Evaluation Session for Semester'}
      children={
        <Box sx={{ minWidth: 1000, maxWidth: 1000, minHeight: 600, position: 'relative' }}>
          {!isReviewSemester && (
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
          )}

          <Box>
            {_.map(evaluationPayloadList, (evaluation, index) => {
              const {
                sessionName,
                round,
                status,
                deadline,
                isFinal,
                createCouncilRequest,
                criterias
              } = evaluation;
              let selectedCriterias: any[] = [];
              if (criterias) {
                _.forEach(criterias, (evaluationCriteria) => {
                  const matchedCriterions = _.find(availableCriterions, (criterion) => {
                    return criterion.code.trim() === evaluationCriteria.code.trim();
                  });
                  if (matchedCriterions) selectedCriterias.push(matchedCriterions);
                });
              }

              return (
                <Grid container spacing={1}>
                  <Grid item xs={isReviewSemester ? 11 : 12}>
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

                          <FormControl sx={{ width: 130, ml: 2 }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                              labelId={`status-evaluation-select-label-${index}`}
                              id={`status-evaluation-select-${index}`}
                              value={status}
                              label="Status"
                              disabled={!isReviewSemester}
                              onChange={(e) => {
                                _handleChangeStatusValue(index, e.target.value);
                              }}
                            >
                              {_.map(STATUS_LIST, (status) => (
                                <MenuItem value={status.value}>
                                  <Typography sx={{ width: '100%' }}>
                                    {status.statusName}
                                  </Typography>
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <Box sx={{ ml: 2 }} component="span">
                            <DatePicker
                              label="Select Deadline"
                              value={moment.unix(deadline).toDate()}
                              disabled={isReviewSemester}
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
                                  disabled={isReviewSemester}
                                  checked={isFinal}
                                  onChange={(e) => {
                                    _handleChangeIsFinalStatus(index, e.target.checked);
                                  }}
                                />
                              }
                              label="Is Final"
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
                              value={selectedCriterias}
                              disabled={isReviewSemester}
                              filterSelectedOptions
                              renderInput={(params) => (
                                <TextField {...params} label="Add criteria" />
                              )}
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

                        {createCouncilRequest && (
                          <CreateConcil
                            index={index}
                            isDisabled={status !== SemesterStatus.PREPARING}
                            lecturerList={lecturerList}
                            projectList={projectList}
                            createCouncilRequest={createCouncilRequest}
                            onChangeLecturer={(newLecturerList: any) =>
                              _handleChangeLecturerValue(index, newLecturerList)
                            }
                            onChangeProject={(newProjectList: any) => {
                              _handleChangeProjectValue(index, newProjectList);
                            }}
                          />
                        )}
                      </Grid>
                    </Card>
                  </Grid>
                  <Grid container item xs={isReviewSemester ? 1 : undefined}>
                    {isReviewSemester && (
                      <>
                        <Grid item>
                          <Box sx={{ pt: 3 }}>
                            <Button
                              disabled={!!createCouncilRequest}
                              variant="outlined"
                              onClick={() => _handleAddConcil(index)}
                              sx={{ height: 170 }}
                            >
                              Add council
                            </Button>
                          </Box>
                        </Grid>
                        {createCouncilRequest && (
                          <Grid item>
                            <Box>
                              <Button
                                variant="outlined"
                                onClick={() => _handleCreateCouncilAndChangeStatus(evaluation)}
                                sx={{ height: 170 }}
                              >
                                Update
                              </Button>
                            </Box>
                          </Grid>
                        )}
                      </>
                    )}
                  </Grid>
                </Grid>
              );
            })}
            {!isReviewSemester && (
              <Button
                variant="outlined"
                startIcon={<Icon icon={plusOutline} />}
                sx={{ width: '100%' }}
                onClick={_handleAddMoreEvaluation}
                disabled={semester?.status !== SemesterStatus.PREPARING}
              >
                Add Evaluation Session
              </Button>
            )}
          </Box>

          {isReviewSemester && evaluationPayloadList.length === 0 && (
            <>
              <Typography variant="h5" textAlign={'center'}>
                No Evaluation Session added yet
              </Typography>
              <Typography variant="subtitle2" textAlign={'center'}>
                Currently this Semester has no evaluation session added yet, add it by update status
                of the semester in semester management
              </Typography>
            </>
          )}

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
            {!isReviewSemester && (
              <LoadingButton
                sx={{ px: 3 }}
                loading={false}
                type="submit"
                variant="contained"
                onClick={_handleUpdateSemesterWithEvaluationSessions}
              >
                Update
              </LoadingButton>
            )}
          </Box>
        </Box>
      }
    />
  );
}
