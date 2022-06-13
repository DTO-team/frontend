// material
import { Grid, Stack } from '@material-ui/core';
// @types
import { Profile as UserProfile, UserPost } from '../../../../@types/user';
//
import ProfileAbout from './ProfileAbout';
import ProfileFollowInfo from './ProfileFollowInfo';
import ProfilePostCard from './ProfilePostCard';
import ProfilePostInput from './ProfilePostInput';
import ProfileSocialInfo from './ProfileSocialInfo';

// ----------------------------------------------------------------------

type ProfileProps = {
  myProfile: UserProfile;
  posts: UserPost[];
};

export default function Profile({ myProfile, posts }: ProfileProps) {
  /*   useEffect(() => {
    const getData = async () => {
      await AccountAPI.getProfile()
        .then((data: any) => console.log(data))
        .catch((err) => console.log('error ', err));
    };
    getData();
  }, []); */

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileFollowInfo profile={myProfile} />
          <ProfileAbout profile={myProfile} />
          <ProfileSocialInfo profile={myProfile} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <ProfilePostInput />
          {posts.map((post) => (
            <ProfilePostCard key={post.id} post={post} />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}
