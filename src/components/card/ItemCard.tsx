// material
import { Box, Card, Stack, Typography } from '@material-ui/core';
import { ButtonAnimate } from 'components/animate';
// utils

interface IItemCardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

export default function ItemCard(props: IItemCardProps) {
  const { title, description, onClick } = props;
  return (
    <ButtonAnimate
      onClick={onClick}
      children={
        <Card
          sx={{
            display: 'flex',
            p: 3,
            minHeight: 200,
            maxHeight: 200,
            cursor: 'pointer'
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">{title}</Typography>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mt: 2, mb: 1, overflow: 'auto', maxWidth: 200, maxHeight: 180 }}
            >
              <Typography component="span" variant="caption" sx={{}}>
                {description}
              </Typography>
            </Stack>
          </Box>
        </Card>
      }
    />
  );
}
