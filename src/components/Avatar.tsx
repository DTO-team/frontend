import { MAvatar } from './@material-extend';
import { MAvatarProps } from './@material-extend/MAvatar';
import createAvatar from '../utils/createAvatar';

// ----------------------------------------------------------------------

interface AvatarProps {
  photoURL?: string;
  displayName?: string;
  sx?: any;
}
export default function Avatar({ photoURL, displayName, sx }: AvatarProps) {
  return (
    <MAvatar
      src={photoURL || ''}
      alt={displayName}
      color={photoURL ? 'default' : createAvatar(displayName || 'Minimals').color}
      sx={sx}
    >
      {createAvatar(displayName || 'Minimals').name}
    </MAvatar>
  );
}
