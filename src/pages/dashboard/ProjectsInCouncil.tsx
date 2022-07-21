import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { useTheme } from '@material-ui/core/styles';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';
// redux
import { RootState, useDispatch, useSelector } from '../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../components/_dashboard/user/list';
import {
  callAPIForGetAllCouncilOfLecturer,
  callAPIForGetEvaluationsessions,
  callAPIForGetCouncilDetail
} from '_apis_/council';
import useAuth from 'hooks/useAuth';
import FormDialogsForCouncilProject from 'components/dialog/FormDialogsForCriteria copy';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'topicName', label: 'Topic name', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'lecturerName', label: 'Lecturer Name', alignRight: false },
  { id: 'actions', label: 'Actions', alignRight: true }
];

// ----------------------------------------------------------------------

type Anonymous = Record<string | number, string>;

function descendingComparator(a: Anonymous, b: Anonymous, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: string, orderBy: string) {
  return order === 'desc'
    ? (a: Anonymous, b: Anonymous) => descendingComparator(a, b, orderBy)
    : (a: Anonymous, b: Anonymous) => -descendingComparator(a, b, orderBy);
}

export default function ProjectsInCouncil() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [councils, setCouncils] = useState<Array<any>>([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { user } = useAuth();

  console.log(councils);

  useEffect(() => {
    handleGetAllProjectInCouncils();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetAllProjectInCouncils = async () => {
    const { statusCode, data } = await callAPIForGetEvaluationsessions();

    if (data && user) {
      let isLecturerInCouncil = false;
      for (let i = 0; i < data.length; i++) {
        if (Boolean(data[i]?.lecturerInCouncils?.length)) {
          for (let j = 0; j < data[i].lecturerInCouncils.length; j++) {
            if (user?.id === data[i].lecturerInCouncils[j].id) {
              isLecturerInCouncil = true;
            }
          }
        }
      }
      if (isLecturerInCouncil) {
        const { statusCode: stt, data: dt } = await callAPIForGetAllCouncilOfLecturer(user?.id);
        if (dt) {
          for (const councilId of dt) {
            const { statusCode: sttt, data: dtt } = await callAPIForGetCouncilDetail(councilId);
            setCouncils([...councils, ...dtt]);
          }
        }
      }
    }
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      const newSelecteds = councils.map((n) => n.userName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName: string) => {
    setFilterName(filterName);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - councils.length) : 0;

  return (
    <Page title="Lecturer: List | DTO">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Projects in council list"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Management' },
            { name: 'Projects in council list' }
          ]}
          action={<div></div>}
        />

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={councils.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {councils
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any) => {
                      const { projectId, topicsResponse } = row;
                      const isItemSelected = selected.indexOf(topicsResponse.topicName) !== -1;
                      return (
                        <TableRow
                          hover
                          key={projectId}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onClick={() => handleClick(projectId)}
                            />
                          </TableCell>
                          <TableCell align="left">{topicsResponse.topicName}</TableCell>
                          <TableCell align="left">{topicsResponse.description}</TableCell>
                          <TableCell align="left">
                            {topicsResponse.lecturersDetails.map((lecturer: any, index: any) => {
                              return (
                                <span>
                                  {lecturer.fullName}
                                  {topicsResponse.lecturersDetails.length === index + 1 ? '' : ', '}
                                </span>
                              );
                            })}
                          </TableCell>
                          <TableCell align="center">
                            <FormDialogsForCouncilProject
                              id={'viewProjectInCouncil'}
                              buttonContent="Detail"
                              title="Project detail"
                              // data={{ id, code, name, evaluation, grades, questions }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={councils.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={(e) => handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
