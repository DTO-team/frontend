import { MAvatar } from './@material-extend';
import { MAvatarProps } from './@material-extend/MAvatar';
import createAvatar from '../utils/createAvatar';

// ----------------------------------------------------------------------

interface AvatarProps {
  photoURL?: string;
  displayName?: string;
}
export default function Avatar({ photoURL, displayName }: AvatarProps) {
  return (
    <MAvatar
      src={photoURL || ''}
      alt={displayName}
      color={photoURL ? 'default' : createAvatar(displayName || 'Minimals').color}
    >
      {createAvatar(displayName || 'Minimals').name}
    </MAvatar>
  );
}
