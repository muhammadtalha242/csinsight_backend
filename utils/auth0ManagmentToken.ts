var axios = require('axios').default;

const getToken = async () => {
  const { AUTH0_ISSUER, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET } = process.env;
  const options = {
    method: 'POST',
    url: `${AUTH0_ISSUER}oauth/token`,
    headers: { 'content-type': 'application/json' },
    data: {
      grant_type: 'client_credentials',
      client_id: AUTH0_CLIENT_ID,
      client_secret: AUTH0_CLIENT_SECRET,
      audience: `${AUTH0_ISSUER}api/v2/`,
    },
  };
  const response = await axios.request(options);
  return response.data;
};

export default getToken;
