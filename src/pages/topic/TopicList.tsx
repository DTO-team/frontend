import _, { filter } from 'lodash';
import { useEffect, useState } from 'react';
// material
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
// redux
import { deleteUser } from '../../redux/slices/user';
import { RootState, useDispatch, useSelector } from '../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// @types
import { UserManager } from '../../@types/user';
// components
import plusFill from '@iconify/icons-eva/plus-fill';
import Icon from '@iconify/react';
import useAuth from 'hooks/useAuth';
import { getTopicList } from 'redux/slices/topic';
import { AuthorizeRole } from 'utils/enum-utils';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../../components/_dashboard/user/list';
import TopicMoreMenu from './components/menu/TopicMoreMenu';
import CreateTopicModal from './modals/CreateTopicModal';
import { getTeamByStudentId } from 'redux/slices/student';
import { createTeamApplication } from 'redux/slices/team-application';
import { useSnackbar } from 'notistack5';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'topicName', label: 'Topic Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'supervisor', label: 'Supervisor', alignRight: false },
  { id: '' }
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

function applySortFilter(
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
}

export default function TopicList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();
  const { userList } = useSelector((state: RootState) => state.user);
  const { topic, student, management } = useSelector((state: RootState) => state);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const handleDeleteUser = (userId: string) => {
    dispatch(deleteUser(userId));
  };

  const _handleRegisterTopic = async (topicId: string) => {
    const { teamId } = student.studentTeam;
    const response = await createTeamApplication(teamId, topicId);
    if (response.statusCode === 200)
      enqueueSnackbar('Register Topic Successfully', { variant: 'success' });
    else enqueueSnackbar('Oops! Something went wrong, try again later', { variant: 'error' });
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  /* const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName); */

  const isUserNotFound = topic.topicList.length === 0;

  useEffect(() => {
    dispatch(getTopicList());
    getTeamByStudentId(user?.id);
  }, [dispatch, user?.id]);

  return (
    <Page title="Topic List | DTO">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Topic List"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Topic List' }]}
          action={
            <>
              {user?.role !== AuthorizeRole.STUDENT && (
                <Button variant="contained" startIcon={<Icon icon={plusFill} />} onClick={() => {}}>
                  Create Topic
                </Button>
              )}
            </>
          }
        />

        <CreateTopicModal isOpen={false} onClose={() => {}} />

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
                  {topic.topicList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((topic) => {
                      const { topicId, topicName, companyDetail, lecturersDetails } = topic;
                      const isItemSelected = selected.indexOf(topicId) !== -1;
                      const firstSupervisor = _.first(lecturersDetails);

                      return (
                        <TableRow
                          hover
                          key={topicId}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onClick={() => handleClick(topicId)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {topicName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {companyDetail?.fullName ? companyDetail?.fullName : 'No Company!'}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {firstSupervisor?.fullName
                                  ? firstSupervisor?.fullName
                                  : 'No supervisor!'}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="right">
                            <TopicMoreMenu
                              onRegisterThisTopic={() => _handleRegisterTopic(topicId)}
                              topicId={topicId}
                            />
                          </TableCell>

                          <TableCell align="right"></TableCell>
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
  );
}
