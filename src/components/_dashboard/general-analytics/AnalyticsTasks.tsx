import { FieldInputProps, Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Box,
  Card,
  Stack,
  Checkbox,
  CardHeader,
  Typography,
  CheckboxProps,
  FormControlLabel
} from '@material-ui/core';
//
import MoreMenuButton from '../../MoreMenuButton';

// ----------------------------------------------------------------------

const TASKS = [
  'Create FireStone Logo',
  'Add SCSS and JS files if required',
  'Stakeholder Meeting',
  'Scoping & Estimations',
  'Sprint Showcase'
];

// ----------------------------------------------------------------------

interface TaskItemProps extends CheckboxProps {
  task: string;
  checked: boolean;
  checkedProps: FieldInputProps<any>;
}
function TaskItem({ task, checked, checkedProps, ...other }: TaskItemProps) {
  return (
    <Stack direction="row" justifyContent="space-between" sx={{ py: 0.75 }}>
      <FormControlLabel
        control={<Checkbox {...checkedProps} value={task} checked={checked} {...other} />}
        label={
          <Typography
            variant="body2"
            sx={{
              ...(checked && {
                color: 'text.disabled',
                textDecoration: 'line-through'
              })
            }}
          >
            {task}
          </Typography>
        }
      />
      <MoreMenuButton />
    </Stack>
  );
}

export default function AnalyticsTasks() {
  const formik = useFormik({
    initialValues: {
      checked: [TASKS[2]]
    },
    onSubmit: (values) => {
      console.log(values);
    }
  });

  const { values, handleSubmit, getFieldProps } = formik;

  const checkedProps = getFieldProps('checked');

  return (
    <Card>
      <CardHeader title="Tasks" />
      <Box sx={{ px: 3, py: 1 }}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            {TASKS.map((task) => (
              <TaskItem
                key={task}
                task={task}
                checkedProps={checkedProps}
                checked={values.checked.includes(task)}
              />
            ))}
          </Form>
        </FormikProvider>
      </Box>
    </Card>
  );
}
