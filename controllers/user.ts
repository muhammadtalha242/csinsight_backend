// import { Request, Response } from 'express';
// import bcrypt from 'bcryptjs';
// import { IVerifyOptions } from 'passport-local';

// import { ILocalUserRequest } from '../interceptors/localUserCheck';

// import passport from '../utils/passport';
// import logger from '../utils/logger';
// import { upload as uploadToBucket } from '../utils/cloudStorage';
// import DEFAULT_NOTIFICATION_SETTINGS from '../constants/notificationSettings';

// const SALT_ROUNDS = 10;

// export interface UserDetails {
//   id: number;
//   email: string;
//   name: string;
//   inDarkMode: boolean;
// }

// interface MulterRequest extends Request {
//   file: any;
// }

// export default () => {
//   const models = require('../db/models');
//   const { user: User, notification_setting: NotificationSetting } = models;

//   return {
//     /** deprecated */
//     register: async (req: Request, res: Response) => {
//       const { name, email, password, inDarkMode } = req.body;
//       try {
//         const existing = await User.findOne({ where: { email } });
//         if (existing) {
//           res.status(403).json({ message: 'User with email already exists.' });
//           return;
//         }
//         const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_ROUNDS));
//         const user = await User.create({ name, email, password: hash, inDarkMode });
//         res.status(201).json({ message: 'User created.', user });
//       } catch (e) {
//         logger.error(e.message);
//         res.status(500).json({ message: 'Server error.', e: e.message });
//       }
//     },
//     /** deprecated */
//     login: (req: Request, res: Response) => {
//       passport.authenticate('local', (err: Error, user: UserDetails, info: IVerifyOptions) => {
//         if (err) logger.error(`An error logging in occurred: ${err}`);
//         if (err) res.status(500).json({ message: err.message });
//         else if (!user) res.status(403).json({ message: info.message });
//         else {
//           req.logIn(user, (err) => {
//             if (err) res.status(500).json({ message: 'Could not create session.' });
//             else res.status(200).json({ user, message: info.message });
//           });
//         }
//       })(req, res);
//     },
//     getUser: async (req: ILocalUserRequest, res: Response) => {
//       const { userId } = req.params;
//       if (req.localUser.id === userId) {
//         res.status(200).json({ message: 'User retrieved.', user: req.localUser });
//       } else {
//         res.status(403).json({ message: 'Unauthorized request.' });
//       }
//     },
//     getNotificationSettings: async (req: ILocalUserRequest, res: Response) => {
//       try {
//         let notificationSettings = await NotificationSetting.findOne({ where: { userId: req.localUser.id } });
//         if (!notificationSettings) {
//           notificationSettings = await NotificationSetting.create({ ...DEFAULT_NOTIFICATION_SETTINGS, userId: req.localUser.id });
//         }
//         res.status(200).json({ message: 'Notification settings retrieved.', notificationSettings });
//       } catch (e) {
//         res.status(500).json({ message: 'Server error.' });
//       }
//     },
//     updateNotificationSettings: async (req: ILocalUserRequest, res: Response) => {
//       try {
//         let notificationSettings = await NotificationSetting.findOne({ where: { userId: req.localUser.id } });
//         if (!notificationSettings) {
//           notificationSettings = await NotificationSetting.create({ ...req.body, userId: req.localUser.id });
//         } else {
//           await NotificationSetting.update({ ...req.body }, { where: { userId: req.localUser.id } });
//           notificationSettings = await NotificationSetting.findOne({ where: { userId: req.localUser.id } });
//         }
//         res.status(200).json({ message: 'Notification settings updated.', notificationSettings });
//       } catch (e) {
//         res.status(500).json({ message: 'Server error.' });
//       }
//     },
//     uploadProfileImage: async (req: ILocalUserRequest & MulterRequest, res: Response) => {
//       if (req.file) {
//         const fileName = `${req.localUser.id}.png`;
//         try {
//           const url = await uploadToBucket(req.file.buffer, fileName, 'scimetic-general');
//           await User.update({ image: url }, { where: { id: req.localUser.id } });
//           res.status(200).json({ message: 'Profile image updated.', image: url });
//         } catch (e) {
//           res.status(500).json({ message: 'Server error.' });
//         }
//       } else {
//         res.status(404).json({ message: 'File not found.' });
//       }
//     },
//     updateUser: async (req: ILocalUserRequest, res: Response) => {
//       const { userId } = req.params;
//       if (req.localUser.id === parseInt(userId)) {
//         try {
//           const { name, email, inDarkMode, emailVerified, mobile, recoveryEmail } = req.body;
//           await User.update({ name, email, inDarkMode, emailVerified, mobile, recoveryEmail }, { where: { id: userId } });
//           const user = await User.findOne({ where: { id: userId } });
//           res.status(200).json({ message: 'User updated.', user });
//         } catch (e) {
//           logger.error(e.message);
//           res.status(500).json({ message: 'Server error occurred.', e: e.message });
//         }
//       } else {
//         res.status(403).json({ message: 'Unauthorized request.' });
//       }
//     },
//   };
// };
