import * as Yup from 'yup';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@material-ui/lab';
import { Box, Card, Grid, Stack, TextField, Typography, FormHelperText } from '@material-ui/core';
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
import { updateUserInfo, updateLecturerInfo } from 'redux/slices/user';
import useAuth from 'hooks/useAuth';
import { AuthorizeRole } from 'utils/enum-utils';
import { setStorage } from 'firebase/methods/setStorage';

// ----------------------------------------------------------------------

type UserNewFormProps = {
  isEdit: boolean;
  currentUser?: {
    fullName: string;
    email: string;
    userName: string;
    id: string;
    avatarUrl: any;
  };
};

export default function UserNewForm({ isEdit, currentUser }: UserNewFormProps) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    username: Yup.string().required('Username is required')
  });

  console.log(currentUser?.avatarUrl);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentUser?.fullName || '',
      email: currentUser?.email || '',
      username: currentUser?.userName || '',
      id: currentUser?.id,
      avatarUrl: currentUser?.avatarUrl || ''
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        let statusCode;
        let url;
        const { uploadAvatar } = setStorage();

        if (values.avatarUrl && values.avatarUrl.file) {
          url = await uploadAvatar(currentUser?.id, values.avatarUrl.file);
        }

        console.log(url);

        if (user?.role === AuthorizeRole.STUDENT) {
          const { statusCode: statusCodeStudent } = await updateUserInfo({
            ...values,
            avatarUrl: url
          });
          statusCode = statusCodeStudent;
        } else {
          const { statusCode: statusCodeLecturer } = await updateLecturerInfo({
            ...values,
            avatarUrl: url
          });
          statusCode = statusCodeLecturer;
        }
        enqueueSnackbar(statusCode === 200 ? 'Updated successfully' : 'Failed to update', {
          variant: statusCode === 200 ? 'success' : 'error'
        });
        if (statusCode === 200) {
          window.location.reload();
        }
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
          file,
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
                {isEdit && user?.role !== AuthorizeRole.ADMIN ? (
                  <UploadAvatar
                    accept="image/*"
                    file={values.avatarUrl}
                    maxSize={3145728}
                    onDrop={handleDrop}
                    error={Boolean(touched.avatarUrl && errors.avatarUrl)}
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
                  />
                ) : (
                  <Avatar
                    photoURL={currentUser?.avatarUrl || ''}
                    displayName={currentUser?.fullName}
                    sx={{ height: '144px', width: '144px' }}
                  />
                )}

                <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                  {touched.avatarUrl && errors.avatarUrl}
                </FormHelperText>
                <Typography variant="h5" sx={{ marginTop: '1rem' }}>
                  {currentUser?.fullName}
                </Typography>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    disabled={!isEdit || user?.role === AuthorizeRole.ADMIN}
                    label="Full Name"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    fullWidth
                    disabled={true}
                    label="Email Address"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    disabled={!isEdit || user?.role === AuthorizeRole.ADMIN}
                    label="Username"
                    {...getFieldProps('username')}
                    error={Boolean(touched.username && errors.username)}
                    helperText={touched.username && errors.username}
                  />
                </Stack>

                {isEdit && user?.role !== AuthorizeRole.ADMIN && (
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    {isEdit && (
                      <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                        Save Changes
                      </LoadingButton>
                    )}
                  </Box>
                )}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
