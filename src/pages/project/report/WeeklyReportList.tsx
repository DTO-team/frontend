import { sentenceCase } from 'change-case';
/* import { filter } from 'lodash'; */
import { useEffect, useState } from 'react';
// material
import plusFill from '@iconify/icons-eva/plus-fill';
import Icon from '@iconify/react';
import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Label, { LabelColor } from 'components/Label';
import WeeklyReportModalContent from 'components/report-modal/WeeklyReportModalContent';
import Scrollbar from 'components/Scrollbar';
import { UserListHead } from 'components/_dashboard/user/list';
import useAuth from 'hooks/useAuth';
import { useSelector } from 'react-redux';
import { getCurrentWeekOfSemester } from 'redux/slices/management';
import { getTeamReports } from 'redux/slices/team';
import { RootState, useDispatch } from 'redux/store';
import { AuthorizeRole, TeamApplicationStatus } from 'utils/enum-utils';
import { TeamManager } from '../../../@types/team';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'reportName', label: 'Report Name', alignRight: false },
  { id: 'mentorFeedback', label: 'Mentor Feedback', alignRight: false },
  { id: 'deadLine', label: 'Deadline', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

/* type Anonymous = Record<string | number, string>; */

/* function descendingComparator(a: Anonymous, b: Anonymous, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
} */

/* function getComparator(order: string, orderBy: string) {
  return order === 'desc'
    ? (a: Anonymous, b: Anonymous) => descendingComparator(a, b, orderBy)
    : (a: Anonymous, b: Anonymous) => -descendingComparator(a, b, orderBy);
} */

/* function applySortFilter(
  array: UserManager[],
  comparator: (a: any, b: any) => number,
  query: string
) {
  const stabilizedThis = array.map((el, index) => [el, index] as const);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
} */

interface IWeeklyReportListProps {
  currentStudentTeam: TeamManager;
}

export default function WeeklyReportList({ currentStudentTeam }: IWeeklyReportListProps) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { user } = useAuth();
  const { userList } = useSelector((state: RootState) => state.user);
  const { application } = useSelector((state: RootState) => state);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isOpenCreatReportModal, setIsOpenCreatReportModal] = useState(false);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      const newSelecteds = userList.map((n) => n.name);
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

  const onClose = () => {
    setIsOpenCreatReportModal(false);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  /* const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName); */

  const isUserNotFound = application.teamApplicationList.length === 0;

  useEffect(() => {
    async function getData() {
      if (currentStudentTeam) {
        await getTeamReports({ teamId: currentStudentTeam.teamId });
        const currentWeek: any = await getCurrentWeekOfSemester(user?.currentSemesterId);
        console.log(currentWeek);
      }
    }
    getData();
  }, [dispatch, currentStudentTeam, user]);

  return (
    <>
      {/* <AlertDialog
        isOpen={isOpenConfirmDialog}
        title="Update Application Status"
        description={
          <div style={{ marginTop: 10 }}>
            You are about to {updateStatusAction} this team application
            <br />
            Are you sure wanted to do this?
          </div>
        }
        onAgree={() => {
          dispatch(
            updateTeamApplicationStatus(updateStatusAction, selectedTeamApplication?.applicationId)
          );
          onClose();
        }}
        onCancle={() => onClose()}
      /> */}

      <WeeklyReportModalContent isOpen={isOpenCreatReportModal} onClose={onClose} />

      <Card>
        <CardHeader
          title="Weekly Reports"
          sx={{ mb: 3 }}
          action={
            <Button
              variant="contained"
              startIcon={<Icon icon={plusFill} />}
              onClick={() => {
                setIsOpenCreatReportModal(true);
              }}
            >
              Report
            </Button>
          }
        />

        <Scrollbar>
          <TableContainer>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={userList.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {application.teamApplicationList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((teamApplication) => {
                    const { applyTeam, topic, status, applicationId } = teamApplication;
                    const isItemSelected = selected.indexOf(applicationId) !== -1;
                    let statusColor: LabelColor;
                    switch (status) {
                      case TeamApplicationStatus.APPROVED: {
                        statusColor = 'success';
                        break;
                      }
                      case TeamApplicationStatus.PENDING: {
                        statusColor = 'warning';
                        break;
                      }
                      case TeamApplicationStatus.REJECTED: {
                        statusColor = 'error';
                        break;
                      }
                      default: {
                        statusColor = 'success';
                      }
                    }

                    return (
                      <TableRow
                        hover
                        key={applicationId}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onClick={() => handleClick(applicationId)}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {applyTeam.teamName}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{topic.topicName}</TableCell>
                        <TableCell align="left">
                          <Label
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={statusColor}
                          >
                            {sentenceCase(status)}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          {user?.role !== AuthorizeRole.STUDENT && <></>}
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
              {isUserNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      You haven't sent any report yet
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={userList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, page) => setPage(page)}
          onRowsPerPageChange={(e) => handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
}
