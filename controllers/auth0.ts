// import { Request, Response } from 'express';
// import axios, { AxiosError } from 'axios';

// import sendMail from '../utils/email';
// import logger from '../utils/logger';

// import getAuth0ManagementToken from '../utils/auth0ManagmentToken';
// import { ILocalUserRequest } from '../interceptors/localUserCheck';
// import { ROLES_MAP } from '../constants/rolesMap';

// export interface ILoginRequest extends Request {
//   body: {
//     username: string;
//     password: string;
//   };
// }

// export interface IResetPasswordRequest extends Request {
//   body: {
//     email: string;
//   };
// }

// export interface IRegisterRequest extends Request {
//   body: {
//     email: string;
//     password: string;
//     firstName: string;
//     lastName: string;
//     connection: string;
//   };
// }

// export interface IVerifyAccountRequest extends Request {
//   body: {
//     code: string;
//     email: string;
//   };
// }

// export interface ISendVerificationCodeRequest extends Request {
//   body: {
//     email: string;
//   };
// }

// export const MIN_CODE = 111111;
// export const MAX_CODE = 999999;

// export const handleAuthError = (e: AxiosError, res: Response): void => {
//   if (e.response) {
//     const { data, status, headers } = e.response;
//     const message = e.message;
//     logger.error(`An error authenticating occurred: ${message} ${headers} ${status}`);
//     res.status(status).json({
//       message: message,
//       isError: true,
//     });
//   } else {
//     logger.error(`An error authenticating occurred: ${JSON.stringify(e)}`);
//     res.status(500).json({
//       message: 'Server error.',
//       isError: true,
//     });
//   }
// };

// export default () => {
//   const models = require('../db/models');
//   const { user: User } = models;
//   const { AUTH0_ISSUER, AUTH0_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET } = process.env;
//   return {
//     register: async (req: IRegisterRequest, res: Response) => {
//       const { email, password, firstName, lastName, connection } = req.body;
//       try {
//         const response = await axios.post(`${AUTH0_ISSUER}dbconnections/signup`, {
//           email,
//           password,
//           firstName,
//           lastName,
//           connection,
//           client_id: AUTH0_CLIENT_ID,
//         });
//         const code = Math.floor(Math.random() * (MAX_CODE - MIN_CODE)) + MIN_CODE;
//         await User.create({
//           email,
//           name: `${firstName} ${lastName}`,
//           auth0Id: `auth0|${response.data._id}`,
//           verificationCode: code,
//           roleId: ROLES_MAP.COMPANY_ADMIN,
//         });
//         sendMail(email, code);
//         logger.info(`User created: ${response.data._id}`);
//         res.status(200).json({ message: 'User registered.' });
//       } catch (e) {
//         handleAuthError(e, res);
//       }
//     },
//     login: async (req: ILoginRequest, res: Response) => {
//       try {
//         const user = await User.findOne({ where: { email: req.body.username }, include: [{ all: true }] });
//         if (!user) {
//           logger.error(`User not found: ${req.body.username}`);
//           res.status(404).json({ message: 'User not found.', isError: true });
//         } else if (!user.emailVerified) {
//           logger.error(`User not verified: ${req.body.username}`);
//           res.status(403).json({ message: 'Account not verified.', isError: true });
//         } else {
//           const response = await axios.post(`${AUTH0_ISSUER}oauth/token`, {
//             ...req.body,
//             grant_type: 'password',
//             audience: AUTH0_AUDIENCE,
//             client_id: AUTH0_CLIENT_ID,
//             client_secret: AUTH0_CLIENT_SECRET,
//             scope: 'openid',
//           });
//           const { access_token, id_token } = response.data;
//           logger.info(`User authenticated: ${req.body.username}`);
//           res.status(200).json({
//             message: 'Login successful.',
//             accessToken: access_token,
//             idToken: id_token,
//             user,
//           });
//         }
//       } catch (e) {
//         handleAuthError(e, res);
//       }
//     },
//     validate: async (req: ILocalUserRequest, res: Response) => {
//       if (req.user) {
//         logger.info(`User session validated: ${req.localUser}`);
//         res.status(200).json({
//           message: 'Session validated.',
//           user: req.localUser,
//           isAuthenticated: true,
//         });
//       }else{
//          logger.error(`Invalid User session: ${req.localUser}`);
//          res.status(403).json({ message: 'Invalid session.' });
//       }
//     },
//     logout: async (req: Request, res: Response) => {},
//     resetPassword: async (req: IResetPasswordRequest, res: Response) => {
//       const { email } = req.body;
//       try {
//         const response = await axios.post(`${AUTH0_ISSUER}dbconnections/change_password`, {
//           email,
//           client_id: AUTH0_CLIENT_ID,
//           connection: 'Username-Password-Authentication',
//         });
//         res.status(200).json({ message: 'Reset password link sent.' });
//       } catch (e) {
//         handleAuthError(e, res);
//       }
//     },
//     verifyAccount: async (req: IVerifyAccountRequest, res: Response) => {
//       const { email, code } = req.body;
//       const user = await User.findOne({ where: { email } });
//       if (!user) return res.status(404).json({ message: 'User not found.' });
//       if (user.emailVerified) return res.status(405).json({ message: 'Account already verified.' });
//       if (user.verificationCode === code) {
//         await User.update({ emailVerified: true }, { where: { id: user.id } });
//         const tokenData = await getAuth0ManagementToken();
//         try {
//           const auth0Response = await axios.patch(
//             `${AUTH0_ISSUER}api/v2/users/${user.auth0Id}`,
//             { email_verified: true },
//             {
//               headers: {
//                 Authorization: `Bearer ${tokenData.access_token}`,
//               },
//             }
//           );
//           res.status(200).json({ message: 'Email verified.' });
//         } catch (e) {
//           logger.error(`Could not verify account: ${user.username} ${e}`);
//           res.status(500).json({ message: 'Server error.' });
//         }
//       } else {
//         logger.error(`Incorrect verification code: ${user.username}`);
//         res.status(403).json({ message: 'Incorrect code.' });
//       }
//     },
//     sendVerificationCode: async (req: ISendVerificationCodeRequest, res: Response) => {
//       const { email } = req.body;
//       const code = Math.floor(Math.random() * (MAX_CODE - MIN_CODE)) + MIN_CODE;
//       const user = await User.findOne({ where: { email } });
//       if (!user) return res.status(404).json({ message: 'User not found.' });
//       if (user.emailVerified) return res.status(405).json({ message: 'Account already verified.' });
//       await User.update({ verificationCode: code }, { where: { id: user.id } });
//       sendMail(email, code);
//       res.status(200).json({ message: `Verification code sent to ${email}.` });
//     },
//   };
// };
