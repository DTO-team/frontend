import { useState, useEffect } from 'react';
// material
import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Grid,
  Autocomplete
} from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { ICriteriaGrade, ICriteriaQuestion } from '../../@types/criterion';
import { LoadingButton } from '@material-ui/lab';
import { generateUniqSerial } from 'utils/uuid';
import { createNewCriteria, updateCriteria, deleteCriteria } from '_apis_/criteria';
import AlertDialog from './AlertDialog';
import ConfirmDialog from './ConfirmDialog';

// ----------------------------------------------------------------------

interface FormDialogsForCouncilProjectProps {
  buttonContent: string;
  title: string;
  content?: string;
  id?: string;
  inputPlaceholder?: string;
  data?: any;
}

type CriteriaState = {
  code: string;
  name: string;
  evaluation: string;
};

type MoreGradeOrquestionsRequesttate = {
  gradesRequest: any[];
  questionsRequest: any[];
};

export default function FormDialogsForCouncilProject({
  buttonContent,
  title,
  content,
  id,
  data = null,
  inputPlaceholder
}: FormDialogsForCouncilProjectProps) {
  const [open, setOpen] = useState(false);
  const [criterias, setCriterias] = useState<CriteriaState>({
    code: '',
    name: '',
    evaluation: ''
  });

  const [moreGradeOrCriteriaQuestion, setMoreGradeOrCriteriaQuestion] =
    useState<MoreGradeOrquestionsRequesttate>({
      gradesRequest: [
        {
          id: generateUniqSerial()
        }
      ],
      questionsRequest: []
    });

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  let navigate = useNavigate();

  useEffect(() => {
    if (Boolean(data)) {
      console.log(data);
      setCriterias({
        code: data.code,
        name: data.name,
        evaluation: data.evaluation
      });
      setMoreGradeOrCriteriaQuestion({
        gradesRequest: data.grades.map((grade: any) => ({
          id: generateUniqSerial(),
          ...grade
        })),
        questionsRequest: data.questions.map((question: any) => ({
          id: generateUniqSerial(),
          ...question
        }))
      });
    }
  }, [data]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setCriterias({
      code: '',
      name: '',
      evaluation: ''
    });
    setMoreGradeOrCriteriaQuestion({
      gradesRequest: [
        {
          id: generateUniqSerial()
        }
      ],
      questionsRequest: []
    });
    setOpen(false);
  };

  const handleOnChange = (key: string, value: string, id?: string) => {
    if (key === 'code' || key === 'name' || key === 'evaluation') {
      setCriterias({
        ...criterias,
        [key]: value
      });
    } else if (
      key === 'level' ||
      key === 'minPoint' ||
      key === 'maxPoint' ||
      key === 'descriptionGrade'
    ) {
      let gradeRequest = moreGradeOrCriteriaQuestion.gradesRequest.findIndex((grade: any) => {
        return grade.id === id;
      });
      moreGradeOrCriteriaQuestion.gradesRequest[gradeRequest] = {
        ...moreGradeOrCriteriaQuestion.gradesRequest[gradeRequest],
        [key === 'descriptionGrade' ? 'description' : key]: value
      };
      setMoreGradeOrCriteriaQuestion({
        ...moreGradeOrCriteriaQuestion
      });
    } else {
      let criteriaQuestion = moreGradeOrCriteriaQuestion.questionsRequest.findIndex(
        (criteria: any) => {
          return criteria.id === id;
        }
      );
      moreGradeOrCriteriaQuestion.questionsRequest[criteriaQuestion] = {
        ...moreGradeOrCriteriaQuestion.questionsRequest[criteriaQuestion],
        [key]: value
      };
      setMoreGradeOrCriteriaQuestion({
        ...moreGradeOrCriteriaQuestion
      });
    }
  };

  const handleAddField = (type: string) => {
    if (type === 'addMoreGradesRequest') {
      setMoreGradeOrCriteriaQuestion({
        ...moreGradeOrCriteriaQuestion,
        gradesRequest: [...moreGradeOrCriteriaQuestion.gradesRequest, { id: generateUniqSerial() }]
      });
    } else {
      setMoreGradeOrCriteriaQuestion({
        ...moreGradeOrCriteriaQuestion,
        questionsRequest: [
          ...moreGradeOrCriteriaQuestion.questionsRequest,
          { id: generateUniqSerial() }
        ]
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (criterias.code === '' || criterias.evaluation === '' || criterias.name === '') {
      enqueueSnackbar('Please add details.');
      return;
    }
    if (id === 'editNewCriteria') {
      const { data: dataResponse, statusCode } = await updateCriteria(data.id, {
        ...criterias,
        ...moreGradeOrCriteriaQuestion
      });
      if (statusCode === 201) {
        enqueueSnackbar('Created successfully new criteria');

        handleClose();
      } else {
        enqueueSnackbar(dataResponse);
      }
    } else {
      const { data, statusCode } = await createNewCriteria({
        ...criterias,
        ...moreGradeOrCriteriaQuestion
      });
      if (statusCode === 201) {
        enqueueSnackbar('Created successfully new criteria');

        handleClose();
      } else {
        enqueueSnackbar(data);
      }
    }
  };

  const handleDeleteCriteria = async () => {
    try {
      const { data: dataResponse, statusCode } = await deleteCriteria(data.id);
      if (statusCode === 200) {
        enqueueSnackbar('Deleted successfully new criteria');

        handleClose();
      } else {
        enqueueSnackbar(dataResponse);
      }
    } catch (e) {}
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button variant="outlined" color="warning" onClick={handleClickOpen}>
        {buttonContent}
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
          <TextField
            disabled={id === 'editNewCriteria'}
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label={'Code'}
            value={criterias.code}
            onChange={(e: any) => handleOnChange('code', e.target.value)}
          />
          <TextField
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label={'Name'}
            value={criterias.name}
            onChange={(e: any) => handleOnChange('name', e.target.value)}
          />
          <TextField
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label={'Evaluation'}
            value={criterias.evaluation}
            onChange={(e: any) => handleOnChange('evaluation', e.target.value)}
            id="outlined-multiline-static"
            multiline
            rows={4}
          />
          <br />
          <br />
          <h4>Grades:</h4>
          {Boolean(moreGradeOrCriteriaQuestion.gradesRequest.length) &&
            moreGradeOrCriteriaQuestion.gradesRequest.map((grade) => (
              <div
                style={{
                  border: '1px solid grey',
                  borderRadius: '12px',
                  padding: '1rem',
                  margin: '1rem 0'
                }}
                key={grade.id}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-level"
                      options={[
                        { label: 'ACCEPTABLE', level: 'ACCEPTABLE' },
                        { label: 'EXCELLENT', level: 'EXCELLENT' },
                        { label: 'GOOD', level: 'GOOD' },
                        { label: 'FAIL', level: 'FAIL' }
                      ]}
                      value={grade.level}
                      onChange={(event, newValue: any) => {
                        handleOnChange('level', newValue.label, grade.id);
                      }}
                      sx={{ width: '100%' }}
                      renderInput={(params) => <TextField {...params} label="Level" />}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      autoFocus
                      fullWidth
                      type="text"
                      margin="dense"
                      variant="outlined"
                      label={'Min point'}
                      value={grade.minPoint}
                      onChange={(e: any) => handleOnChange('minPoint', e.target.value, grade.id)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      autoFocus
                      fullWidth
                      type="text"
                      margin="dense"
                      variant="outlined"
                      label={'Max point'}
                      value={grade.maxPoint}
                      onChange={(e: any) => handleOnChange('maxPoint', e.target.value, grade.id)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      autoFocus
                      fullWidth
                      type="text"
                      margin="dense"
                      variant="outlined"
                      label={'Description'}
                      value={grade.description}
                      onChange={(e: any) =>
                        handleOnChange('descriptionGrade', e.target.value, grade.id)
                      }
                    />
                  </Grid>
                </Grid>
              </div>
            ))}
          <br />

          <LoadingButton
            type="submit"
            variant="contained"
            loading={false}
            onClick={() => handleAddField('addMoreGradesRequest')}
          >
            Add Grade
          </LoadingButton>
          <br />
          <br />

          <h4>Criteria Question:</h4>
          {Boolean(moreGradeOrCriteriaQuestion.questionsRequest.length) &&
            moreGradeOrCriteriaQuestion.questionsRequest.map((criteria) => (
              <div
                style={{
                  border: '1px solid grey',
                  borderRadius: '12px',
                  padding: '1rem',
                  margin: '1rem 0'
                }}
                key={criteria.id}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      autoFocus
                      fullWidth
                      type="text"
                      margin="dense"
                      variant="outlined"
                      label={'Priority'}
                      value={criteria.priority}
                      onChange={(e: any) => handleOnChange('priority', e.target.value, criteria.id)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      autoFocus
                      fullWidth
                      type="text"
                      margin="dense"
                      variant="outlined"
                      label={'Description'}
                      value={criteria.description}
                      onChange={(e: any) =>
                        handleOnChange('description', e.target.value, criteria.id)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      autoFocus
                      fullWidth
                      type="text"
                      margin="dense"
                      variant="outlined"
                      label={'Sub Criteria'}
                      value={criteria.subCriteria}
                      onChange={(e: any) =>
                        handleOnChange('subCriteria', e.target.value, criteria.id)
                      }
                    />
                  </Grid>
                </Grid>
              </div>
            ))}
          <br />
          <LoadingButton
            type="submit"
            variant="contained"
            loading={false}
            onClick={() => handleAddField('addMoreCriteriaQuestion')}
          >
            Add Criteria Question
          </LoadingButton>
        </DialogContent>
        <DialogActions>
          <ConfirmDialog
            title={'Are you sure to delete this criteria?'}
            onAgree={handleDeleteCriteria}
            onCancle={() => {}}
          />
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" type="submit">
            {id === 'addNewCriteria' ? 'Create' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
