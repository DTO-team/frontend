import * as Yup from 'yup';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@material-ui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
  FormHelperText,
  FormControlLabel
} from '@material-ui/core';
// utils
import { fData } from '../../../utils/formatNumber';
import fakeRequest from '../../../utils/fakeRequest';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { UserManager } from '../../../@types/user';
//
import Label from '../../Label';
import { UploadAvatar } from '../../upload';
import countries from './countries';
import Avatar from 'components/Avatar';

// ----------------------------------------------------------------------

type UserNewFormProps = {
  isEdit: boolean;
  currentUser?: {
    fullName: string;
    email: string;
    userName: string;
  };
};

export default function UserNewForm({ isEdit, currentUser }: UserNewFormProps) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    username: Yup.string().required('Username is required')
  });

  console.log(currentUser);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentUser?.fullName || '',
      email: currentUser?.email || '',
      username: currentUser?.userName || ''
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
        navigate(PATH_DASHBOARD.user.list);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } =
    formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('avatarUrl', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3 }}>
              {isEdit && (
                <Label
                  color={'success'}
                  sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
                >
                  Actived
                </Label>
              )}

              <Box
                sx={{
                  mb: 5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}
              >
                <Avatar
                  displayName={currentUser?.fullName}
                  sx={{ height: '144px', width: '144px' }}
                />
                <Typography variant="h5" sx={{ marginTop: '1rem' }}>
                  {currentUser?.fullName}
                </Typography>
                {/* <UploadAvatar
                  accept="image/*"
                  file={null}
                  maxSize={3145728}
                  onDrop={handleDrop}
                  caption={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary'
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                /> */}
              </Box>

              {/* {isEdit && (
                <FormControlLabel
                  labelPlacement="start"
                  control={
                    <Switch
                      onChange={(event) =>
                        setFieldValue('status', event.target.checked ? 'banned' : 'active')
                      }
                      checked={values.status !== 'active'}
                    />
                  }
                  label={
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        Banned
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Apply disable account
                      </Typography>
                    </>
                  }
                  sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
                />
              )} */}

              {/* <FormControlLabel
                labelPlacement="start"
                control={<Switch {...getFieldProps('isVerified')} checked={values.isVerified} />}
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Email Verified
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Disabling this will automatically send the user a verification email
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              /> */}
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    disabled={!isEdit}
                    label="Full Name"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    fullWidth
                    disabled={!isEdit}
                    label="Email Address"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    disabled={!isEdit}
                    label="Username"
                    {...getFieldProps('username')}
                    error={Boolean(touched.username && errors.username)}
                    helperText={touched.username && errors.username}
                  />
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  {isEdit && (
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                      Save Changes
                    </LoadingButton>
                  )}
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
