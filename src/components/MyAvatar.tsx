// hooks
import useAuth from '../hooks/useAuth';
//
import { MAvatar } from './@material-extend';
import { MAvatarProps } from './@material-extend/MAvatar';
import createAvatar from '../utils/createAvatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }: MAvatarProps) {
  const { user } = useAuth();

  return (
    <MAvatar
      src={user?.avatarUrl || ''}
      alt={user?.displayName}
      color={user?.avatarUrl ? 'default' : createAvatar(user?.displayName || 'Minimals').color}
      {...other}
    >
      {createAvatar(user?.displayName || 'Minimals').name}
    </MAvatar>
  );
}
