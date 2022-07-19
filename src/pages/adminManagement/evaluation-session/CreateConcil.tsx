import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';

interface ICreateConcilProps {
  lecturerList: any;
  projectList: any;
  onChangeLecturer: (newLecturerList: any) => void;
  onChangeProject: (newProjectList: any) => void;
}

export default function CreateConcil({
  lecturerList,
  projectList,
  onChangeLecturer,
  onChangeProject
}: ICreateConcilProps) {
  return (
    <>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <Typography>Lecturers:</Typography>
          <Autocomplete
            multiple
            options={lecturerList}
            getOptionLabel={(option: any) => option.fullName}
            onChange={(event: any, value) => onChangeLecturer(value)}
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} label="Add Lecturers" />}
          />
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth>
          <Typography>Projects:</Typography>
          <Autocomplete
            multiple
            options={projectList}
            getOptionLabel={(option: any) => option.topicsResponse.topicName}
            onChange={(event: any, value) => onChangeProject(value)}
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} label="Add Projects" />}
          />
        </FormControl>
      </Grid>
    </>
  );
}
