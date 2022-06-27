import { FormControl, MenuItem, Select } from '@material-ui/core';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSemester } from 'redux/slices/management';
import { RootState } from 'redux/store';
import axiosInstance from 'utils/axios';

export default function SwitchSemesterPopOver() {
  const dispatch = useDispatch();
  const { semesters, selectedSemester } = useSelector((state: RootState) => state.management);

  const _handleChangeSelectedSemester = (event: any) => {
    dispatch(setSelectedSemester(JSON.parse(event.target.value)));
    sessionStorage.setItem('currentSemester', event.target.value);
    document.location.reload();
  };

  return (
    <FormControl fullWidth>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={JSON.stringify(selectedSemester)}
        onChange={(event) => _handleChangeSelectedSemester(event)}
        sx={{ width: 180 }}
      >
        {_.map(semesters, (semester) => {
          const { id, year, season } = semester;

          return (
            <MenuItem
              key={id}
              value={`${JSON.stringify(semester)}`}
            >{`${season}_${year}`}</MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
