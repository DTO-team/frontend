import { Icon } from '@iconify/react';
import arrowLeftFill from '@iconify/icons-eva/arrow-left-fill';
import arrowRightFill from '@iconify/icons-eva/arrow-right-fill';
// material
import { useTheme, styled } from '@material-ui/core/styles';
import { Box, BoxProps } from '@material-ui/core';
//
import { MIconButton } from '../../@material-extend';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  zIndex: 9,
  display: 'flex',
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2)
}));

const ArrowStyle = styled(MIconButton)(({ theme }) => ({
  padding: 6,
  opacity: 0.48,
  color: theme.palette.common.white,
  '&:hover': { opacity: 1 }
}));

// ----------------------------------------------------------------------

interface CarouselControlsArrowsBasic1Props extends BoxProps {
  onNext?: VoidFunction;
  onPrevious?: VoidFunction;
}

export default function CarouselControlsArrowsBasic1({
  onNext,
  onPrevious,
  ...other
}: CarouselControlsArrowsBasic1Props) {
  const theme = useTheme();
  const isRTL = theme.direction === 'rtl';

  return (
    <RootStyle {...other}>
      <ArrowStyle size="small" onClick={onPrevious}>
        <Icon width={20} height={20} icon={isRTL ? arrowRightFill : arrowLeftFill} />
      </ArrowStyle>

      <ArrowStyle size="small" onClick={onNext}>
        <Icon width={20} height={20} icon={isRTL ? arrowLeftFill : arrowRightFill} />
      </ArrowStyle>
    </RootStyle>
  );
}
