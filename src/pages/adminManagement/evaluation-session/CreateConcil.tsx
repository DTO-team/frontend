import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import _ from 'lodash';
import { useEffect, useState } from 'react';

interface ICreateConcilProps {
  index: any;
  lecturerList: any;
  projectList: any;
  createCouncilRequest: any;
  isDisabled: boolean;
  onChangeLecturer: (newLecturerList: any) => void;
  onChangeProject: (newProjectList: any) => void;
}

export default function CreateConcil({
  index,
  lecturerList,
  projectList,
  onChangeLecturer,
  onChangeProject,
  createCouncilRequest,
  isDisabled
}: ICreateConcilProps) {
  const { lecturerId, projectId } = createCouncilRequest;

  let selectedLecturer: any[] = [];
  if (createCouncilRequest) {
    _.forEach(lecturerId, (selectedId) => {
      const matchedLecturer = _.find(lecturerList, (lecturer) => lecturer.id === selectedId);
      if (matchedLecturer) selectedLecturer.push(matchedLecturer);
    });
  }

  let selectedProjects: any[] = [];
  if (createCouncilRequest) {
    _.forEach(projectId, (selectedId) => {
      const matchedProject = _.find(projectList, (project) => project.projectId === selectedId);
      if (matchedProject) selectedProjects.push(matchedProject);
    });
  }

  return (
    <>
      <Grid item xs={12}>
        <FormControl key={`update-lectuer-${index}`} fullWidth>
          <Typography>Lecturers:</Typography>
          <Autocomplete
            id={`update-lectuer-${index}`}
            multiple
            disabled={isDisabled}
            options={lecturerList}
            getOptionLabel={(option: any) => option.fullName}
            onChange={(event: any, value) => onChangeLecturer(value)}
            filterSelectedOptions
            value={selectedLecturer}
            renderInput={(params) => <TextField {...params} label="Add Lecturers" />}
          />
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl key={`update-project2-${index}`} fullWidth>
          <Typography>Projects:</Typography>
          <Autocomplete
            id={`update-project2-${index}`}
            multiple
            disabled={isDisabled}
            options={projectList}
            getOptionLabel={(option: any) => option.topicsResponse.topicName}
            onChange={(event: any, value) => onChangeProject(value)}
            filterSelectedOptions
            value={selectedProjects}
            renderInput={(params) => <TextField {...params} label="Add Projects" />}
          />
        </FormControl>
        <Typography variant="body2" color="red">
          *Please note that add council will need change the status to On Going and can not be going
          back to Not Started nor update concil.
        </Typography>
      </Grid>
    </>
  );
}
