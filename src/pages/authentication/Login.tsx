import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Link,
  Stack,
  Tooltip,
  Typography
} from '@material-ui/core';
import { Icon } from '@iconify/react';
import googleIcon from '@iconify/icons-logos/google-icon';
// material
import { styled } from '@material-ui/core/styles';
import { capitalCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
import { MHidden } from '../../components/@material-extend';
import { LoginForm } from '../../components/authentication/login';
// components
import Page from '../../components/Page';
// hooks
import useAuth from '../../hooks/useAuth';
// layouts
import AuthLayout from '../../layouts/AuthLayout';
import { PATH_AUTH } from '../../routes/paths';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { method, loginWithGoogle } = useAuth();
  return (
    <RootStyle title="Login | DTO">
      <AuthLayout>
        <span></span>
      </AuthLayout>
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Sign in to DTO
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
            </Box>
          </Stack>
          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            onClick={loginWithGoogle}
            sx={{
              mb: 2
            }}
          >
            <Typography sx={{ mr: 1 }}>Login with Google</Typography>
            <Icon icon={googleIcon} color="#1877F2" height={24} />
          </Button>
          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
                Get started
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
