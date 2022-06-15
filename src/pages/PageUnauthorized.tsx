import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
// material
import { Box, Button, Typography, Container } from '@material-ui/core';
// components
import Page from '../components/Page';
import { SeverErrorIllustration } from '../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function PageUnauthorized() {
  return (
    <RootStyle title="Unauthorized | Minimal-UI">
      <Container>
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
          <Typography variant="h3" paragraph>
            Unauthorized!
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            You don't have permission to view this page!
          </Typography>

          <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Go to Home
          </Button>
        </Box>
      </Container>
    </RootStyle>
  );
}
