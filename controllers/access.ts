// import { Request, Response } from 'express';
// import axios from 'axios';
// import Sequelize from 'sequelize';

// import sendMail from '../utils/email';
// import { AUTH0_CONNECTIONS } from '../constants/auth0';
// import { MAX_CODE, MIN_CODE } from './auth0';
// import { ILocalUserRequest } from '../interceptors/localUserCheck';
// import { handleAuthError } from './auth0';
// import { updateAuth0User, deleteAuth0User } from '../services/auth0';

// const Op = Sequelize.Op;

// interface IUpdateAccessUser {
//   name?: string;
//   email?: string;
//   roleId?: number;
// }

// export default () => {
//   const models = require('../db/models');
//   const { user: User, role: Role } = models;

//   const { AUTH0_ISSUER, AUTH0_CLIENT_ID } = process.env;

//   return {
//     getAccessUsers: async (req: ILocalUserRequest, res: Response) => {
//       const users = await User.findAll({
//         where: {
//           companyId: req.localUser.companyId,
//           id: {
//             [Op.ne]: req.localUser.id,
//           },
//         },
//         attributes: { exclude: ['verificationCode', 'inDarkMode', 'recoveryEmail', 'mobile'] },
//         include: { model: Role },
//       });
//       res.status(200).json({ message: 'Access users retrieved.', users });
//     },
//     createAccessUser: async (req: ILocalUserRequest, res: Response) => {
//       const { firstName, lastName, email, role, pin } = req.body;
//       try {
//         const userRole = await Role.findOne({ where: { code: role } });
//         if (!userRole) return res.status(404).json({ message: 'Not a valid user role.' });
//         const existingUser = await User.findOne({ where: { email } });
//         if (existingUser) return res.status(403).json({ message: 'User with email already exists.' });
//         const response = await axios.post(`${AUTH0_ISSUER}dbconnections/signup`, {
//           email,
//           password: pin,
//           firstName,
//           lastName,
//           connection: AUTH0_CONNECTIONS.USERNAME_PASSWORD.name,
//           client_id: AUTH0_CLIENT_ID,
//         });
//         const code = Math.floor(Math.random() * (MAX_CODE - MIN_CODE)) + MIN_CODE;
//         const user = await User.create({
//           email,
//           name: `${firstName} ${lastName}`,
//           auth0Id: `${AUTH0_CONNECTIONS.USERNAME_PASSWORD.idPrefix}|${response.data._id}`,
//           verificationCode: code,
//           roleId: userRole.id,
//           companyId: req.localUser.companyId,
//         });
//         sendMail(email, code);
//         res.status(200).json({ message: 'User created.', user });
//       } catch (e) {
//         handleAuthError(e, res);
//       }
//     },
//     updateAccessUser: async (req: ILocalUserRequest, res: Response) => {
//       const { userId } = req.params;
//       const { firstName, lastName, email, role } = req.body;
//       try {
//         const user = await User.findOne({ where: { id: userId, companyId: req.localUser.companyId } });
//         if (!user) return res.status(404).json({ message: 'User not found in your company.' });
//         if (email) {
//           const userWithEmail = await User.findOne({ where: { email, id: { [Op.ne]: userId } } });
//           if (userWithEmail) return res.status(403).json({ message: 'User with email already exists.' });
//         }
//         const updateUser: IUpdateAccessUser = {
//           name: `${firstName} ${lastName}`,
//           email,
//         };
//         let userRole;
//         if (role) {
//           userRole = await Role.findOne({ where: { code: role } });
//           if (!userRole) return res.status(404).json({ message: 'Not a valid user role.' });
//           updateUser.roleId = userRole.id;
//         }
//         await User.update(updateUser, { where: { id: userId } });
//         updateAuth0User(user.auth0Id, { firstName, lastName, email });
//         res.status(200).json({ message: 'User updated.' });
//       } catch (e) {
//         res.status(500).json({ message: 'Server error.' });
//       }
//     },
//     deleteAccessUsers: async (req: ILocalUserRequest, res: Response) => {
//       const { userIds } = req.body;
//       const users = await User.findAll({ where: { id: { [Op.in]: userIds } } });
//       if (users.length === 0) return res.status(404).json({ message: 'Users with given IDs are not found.' });
//       let allUsersBelongToCompany = true;
//       for (let i = 0; i < users.length; i++) {
//         if (users[i].companyId !== req.localUser.companyId) {
//           allUsersBelongToCompany = false;
//           break;
//         }
//       }
//       if (!allUsersBelongToCompany) {
//         res.status(403).json({ message: 'All of the users do not belong to your company.' });
//       } else {
//         await User.destroy({ where: { id: { [Op.in]: userIds } } });
//         users.forEach((user) => {
//           deleteAuth0User(user.auth0Id);
//         });
//         res.status(200).json({ message: 'Users deleted.' });
//       }
//     },
//   };
// };
