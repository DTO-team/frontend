import { sentenceCase } from 'change-case';
/* import { filter } from 'lodash'; */
import { useEffect, useState } from 'react';
// material
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import {
  Button,
  Card,
  Checkbox,
  Container,
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
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import Label, { LabelColor } from 'components/Label';
import Page from 'components/Page';
import Scrollbar from 'components/Scrollbar';
import SearchNotFound from 'components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from 'components/_dashboard/user/list';
import useSettings from 'hooks/useSettings';
import { useSelector } from 'react-redux';
import { deleteUser, getUserList } from 'redux/slices/user';
import { RootState, useDispatch } from 'redux/store';
import { PATH_DASHBOARD } from 'routes/paths';
import { TeamApplicationStatus } from 'utils/enum-utils';
import CreateNewApplicationModal from './modals/CreateNewApplicationModal';
import { getTeamApplicationList, updateTeamApplicationStatus } from 'redux/slices/team-application';
import TeamApplicationMenu from './components/menu/TeamApplicationMenu';
import { TeamApplication } from '../../@types/application';
import AlertDialog from 'components/dialog/AlertDialog';

/* import { UserManager } from '../../../@types/user'; */
// redux
// routes
// hooks
// @types
// components

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Team name', alignRight: false },
  { id: 'company', label: 'Topic', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

const FAKE_APPLICATION = [
  {
    applicationId: '1',
    team: {
      name: 'YOST',
      semester: 'Summer',
      teamLeader: 'Thanh'
    },
    topic: {
      name: 'The business of RUM',
      description: 'Descript 1'
    },
    status: TeamApplicationStatus.REJECTED
  },
  {
    applicationId: '2',
    team: {
      name: 'BIKE-TAG',
      semester: 'Summer',
      teamLeader: 'Thanh'
    },
    topic: {
      name: 'The smart devices',
      description: 'Descript 2'
    },
    status: TeamApplicationStatus.APPROVED
  },
  {
    applicationId: '3',
    team: {
      name: 'JOJI',
      semester: 'Summer',
      teamLeader: 'Thanh'
    },
    topic: {
      name: 'Japanese to the moon',
      description: 'Descript 3'
    },
    status: TeamApplicationStatus.PENDING
  }
];

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

export default function TeamApplicationList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { userList } = useSelector((state: RootState) => state.user);
  const { application } = useSelector((state: RootState) => state);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedTeamApplication, setSelectedTeamApplication] = useState<TeamApplication>();
  const [updateStatusAction, setUpdateStatusAction] = useState<TeamApplicationStatus>();
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isOpenCreateApplicationModal, setIsOpenCreateApplicationModal] = useState(false);
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);

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

  const handleFilterByName = (filterName: string) => {
    setFilterName(filterName);
  };

  const handleOpenCreateApplicationModal = () => {
    setIsOpenCreateApplicationModal(true);
  };

  const onClose = () => {
    setIsOpenCreateApplicationModal(false);
    setIsOpenConfirmDialog(false);
  };

  const _handleChangeTeamApplicationStatus = (
    teamApplication: TeamApplication,
    action: TeamApplicationStatus
  ) => {
    setIsOpenConfirmDialog(true);
    setUpdateStatusAction(action);
    setSelectedTeamApplication(teamApplication);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  /* const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName); */

  const isUserNotFound = application.teamApplicationList.length === 0;

  useEffect(() => {
    dispatch(getUserList());
    dispatch(getTeamApplicationList());
  }, [dispatch]);

  return (
    <>
      <CreateNewApplicationModal isOpen={isOpenCreateApplicationModal} onClose={onClose} />
      <AlertDialog
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
      />

      <Page title="Student: List | DTO">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Team Applications"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              { name: 'Management' },
              { name: 'Team Applications' }
            ]}
            action={
              <Button
                variant="contained"
                startIcon={<Icon icon={plusFill} />}
                onClick={() => handleOpenCreateApplicationModal()}
              >
                New Team Application
              </Button>
            }
          />

          <Card>
            <UserListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
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
                              <TeamApplicationMenu
                                onApprove={() => {
                                  _handleChangeTeamApplicationStatus(
                                    teamApplication,
                                    TeamApplicationStatus.APPROVED
                                  );
                                }}
                                onReject={() => {
                                  _handleChangeTeamApplicationStatus(
                                    teamApplication,
                                    TeamApplicationStatus.REJECTED
                                  );
                                }}
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
                  {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
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
        </Container>
      </Page>
    </>
  );
}
