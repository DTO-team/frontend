import faker from 'faker';
import { sample } from 'lodash';
import { Icon } from '@iconify/react';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
// material
import { Stack, Typography, Box, Rating, Pagination, LinearProgress } from '@material-ui/core';
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  useGridSlotComponentProps,
  GridFilterInputValueProps,
  getGridNumericColumnOperators
} from '@material-ui/data-grid';
// utils
import createAvatar from '../../../../utils/createAvatar';
import { fPercent } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import { MIconButton, MAvatar } from '../../../../components/@material-extend';

// ----------------------------------------------------------------------

const columns: GridColDef[] = [
  // OPTIONS
  // https://material-ui.com/api/data-grid/grid-col-def/#main-content
  // - hide: false (default)
  // - editable: false (default)
  // - filterable: true (default)
  // - sortable: true (default)
  // - disableColumnMenu: false (default)

  // FIELD TYPES
  // --------------------
  // 'string' (default)
  // 'number'
  // 'date'
  // 'dateTime'
  // 'boolean'
  // 'singleSelect'

  {
    field: 'id',
    hide: true
  },
  {
    field: 'avatar',
    headerName: 'Avatar',
    width: 64,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    renderCell: (params) => {
      const getAvatar = params.getValue(params.id, 'name') as string;
      return (
        <MAvatar color={createAvatar(getAvatar).color} sx={{ width: 36, height: 36 }}>
          {createAvatar(getAvatar).name}
        </MAvatar>
      );
    }
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    renderCell: (params) => {
      const getEmail = params.getValue(params.id, 'email');
      return (
        <Typography variant="body2" sx={{ textDecoration: 'underline' }} noWrap>
          {getEmail}
        </Typography>
      );
    }
  },
  {
    field: 'lastLogin',
    type: 'dateTime',
    headerName: 'Last login',
    width: 200,
    align: 'right',
    headerAlign: 'right'
  },
  {
    field: 'rating',
    type: 'number',
    headerName: 'Rating',
    width: 160,
    disableColumnMenu: true,
    renderCell: (params) => {
      const getRating = params.getValue(params.id, 'rating') as number;
      return <Rating size="small" value={getRating} precision={0.5} readOnly />;
    }
  },
  {
    field: 'status',
    type: 'singleSelect',
    headerName: 'Status',
    width: 120,
    valueOptions: ['online', 'away', 'busy'],
    renderCell: (params) => {
      const getStatus = params.getValue(params.id, 'status');
      return (
        <Label
          color={
            (getStatus === 'busy' && 'error') || (getStatus === 'away' && 'warning') || 'success'
          }
          sx={{ textTransform: 'capitalize', mx: 'auto' }}
        >
          {getStatus}
        </Label>
      );
    }
  },
  {
    field: 'isAdmin',
    type: 'boolean',
    width: 120,
    renderCell: (params) => {
      const getAdmin = params.getValue(params.id, 'isAdmin');
      return (
        <Stack alignItems="center" sx={{ width: 1, textAlign: 'center' }}>
          {getAdmin ? (
            <Box
              component={Icon}
              icon={checkmarkCircle2Fill}
              sx={{ width: 20, height: 20, color: 'primary.main' }}
            />
          ) : (
            '-'
          )}
        </Stack>
      );
    }
  },
  {
    field: 'performance',
    type: 'number',
    headerName: 'Performance',
    width: 160,
    renderCell: (params) => {
      const value = params.getValue(params.id, 'performance') as number;
      return (
        <Stack direction="row" alignItems="center" sx={{ px: 2, width: 1, height: 1 }}>
          <LinearProgress
            value={value}
            variant="determinate"
            color={(value < 30 && 'error') || (value > 30 && value < 70 && 'warning') || 'primary'}
            sx={{ width: 1, height: 6 }}
          />
          <Typography variant="caption" sx={{ width: 90 }}>
            {fPercent(value)}
          </Typography>
        </Stack>
      );
    }
  },
  {
    field: 'action',
    headerName: ' ',
    width: 80,
    align: 'right',
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      const selectedID = params.row.id;
      const handleClick = () => {
        console.log('selectedID', selectedID);
      };

      return (
        <MIconButton onClick={handleClick}>
          <Box component={Icon} icon={moreVerticalFill} sx={{ width: 20, height: 20 }} />
        </MIconButton>
      );
    }
  }
];

const rows = [...Array(100)].map((_, index) => {
  const setIndex = index + 1;
  return {
    id: `8307849d-1a0d-595b-a8f3-690cdb4afd5b-${setIndex}`,
    avatar: faker.image.avatar(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    lastLogin: faker.datatype.datetime(),
    performance: faker.datatype.number({ min: 9, max: 99, precision: 0.1 }),
    rating: faker.datatype.number({ min: 0, max: 5, precision: 0.5 }),
    status: sample(['online', 'away', 'busy']),
    isAdmin: faker.datatype.boolean()
  };
});

// ----------------------------------------------------------------------

function CustomPagination() {
  const { state, apiRef } = useGridSlotComponentProps();

  return (
    <Pagination
      color="primary"
      count={state.pagination.pageCount}
      page={state.pagination.page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

function RatingInputValue({ item, applyValue }: GridFilterInputValueProps) {
  return (
    <Box sx={{ pl: 2, height: 1, alignItems: 'center', display: 'inline-flex' }}>
      <Rating
        size="small"
        name="custom-rating-filter-operator"
        placeholder="Filter value"
        value={Number(item.value)}
        onChange={(event, newValue) => {
          applyValue({ ...item, value: newValue });
        }}
        precision={0.5}
      />
    </Box>
  );
}

export default function DataGridCustom() {
  if (columns.length > 0) {
    const ratingColumn = columns.find((column) => column.field === 'rating');
    const ratingColIndex = columns.findIndex((col) => col.field === 'rating');

    const ratingFilterOperators = getGridNumericColumnOperators().map((operator) => ({
      ...operator,
      InputComponent: RatingInputValue
    }));

    columns[ratingColIndex] = {
      ...ratingColumn,
      filterOperators: ratingFilterOperators
    } as GridColDef;
  }

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pagination
      pageSize={10}
      components={{
        Toolbar: GridToolbar,
        Pagination: CustomPagination
      }}
      filterModel={{
        items: [{ columnField: 'rating', value: '1.5', operatorValue: '>=' }]
      }}
    />
  );
}
