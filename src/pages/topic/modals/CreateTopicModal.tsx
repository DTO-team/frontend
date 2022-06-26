import { Box, Button, FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core';
import ActionModal from 'components/modal/ActionModal';

interface ICreateTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTopicModal(props: ICreateTopicModalProps) {
  const { isOpen, onClose } = props;
  /* const dispatch = useDispatch();
  const { user } = useAuth();
  const { topic, team } = useSelector((state: RootState) => state); */

  const _handleSubmitNewTopic = (value: any) => {
    console.log(value);
  };

  return (
    <ActionModal
      title="Create new topic"
      isOpen={isOpen}
      onClose={onClose}
      children={
        <>
          <FormControl onSubmit={_handleSubmitNewTopic}>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input type="outlined" id="my-input" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
              <Button variant="outlined" sx={{ mr: 2 }} onClick={() => {}}>
                Discard
              </Button>
              <Button type="submit" variant="contained">
                Create topic
              </Button>
            </Box>
          </FormControl>
        </>
      }
    />
  );
}
