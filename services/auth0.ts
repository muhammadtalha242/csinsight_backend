import axios from 'axios';

import getAuth0ManagementToken from '../utils/auth0ManagmentToken';

interface IAuth0UpdateUser {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export const deleteAuth0User = async (userId: string) => {
  const { AUTH0_ISSUER } = process.env;
  const tokenData = await getAuth0ManagementToken();
  try {
    const auth0Response = await axios.delete(`${AUTH0_ISSUER}api/v2/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });
    return true;
  } catch (e) {
    return false;
  }
};

export const updateAuth0User = async (userId: string, updates: IAuth0UpdateUser) => {
  const { AUTH0_ISSUER } = process.env;
  const tokenData = await getAuth0ManagementToken();
  try {
    const auth0Response = await axios.patch(
      `${AUTH0_ISSUER}api/v2/users/${userId}`,
      {
        given_name: updates.firstName,
        family_name: updates.lastName,
        email: updates.email,
        name: `${updates.firstName} ${updates.lastName}`,
      },
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );
    return true;
  } catch (e) {
    return false;
  }
};
