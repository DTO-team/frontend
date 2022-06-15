/* eslint-disable no-restricted-globals */
import axios from 'utils/axios';

export const callAPIForCreateNewTeam = async (teamName: string): Promise<Number> => {
  const { status } = await axios.post('/v1/teams', {
    teamName
  });
  return status;
};
