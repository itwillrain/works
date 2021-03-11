import * as functions from "firebase-functions";
import * as admin from 'firebase-admin'
import { DeleteUserDto } from '@works/core';
import { UserRepo } from '../../../domain/users/repo';
import { checkIfUserExist } from '.';
const auth = admin.auth();
const db = admin.firestore();
const userRepo = new UserRepo(db)

export const deleteUser = functions.region(functions.config().locale.region).https.onCall(async (data, context) => {
  functions.logger.info(`start to exec delete user function`)
  const { uid } = new DeleteUserDto(data);
  const user = await userRepo.getUser(uid);
  if(!user) throw new functions.https.HttpsError('failed-precondition', `${uid}'s firestore colud not find'`);
  const {email, role} = user;
  // 認証チェック
  if (!context.auth) {
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' + 'while authenticated.');
  }
  // 管理権限チェック
  if(context.auth.token.role !== 'systemAdmin' && context.auth.token.role !== 'owner') {
    throw new functions.https.HttpsError('failed-precondition', `The function must be called while "systemAdmin" or "owner"`)
  }

  // ownerはuserしか管理できない
  if(context.auth.token.role === 'owner' && role !== 'user') {
    throw new functions.https.HttpsError('failed-precondition', `The function must be called while "systemAdmin" or "owner"`)
  }

  // 本人のアカウントは削除不可
  if(context.auth.token.email === email) throw new functions.https.HttpsError('invalid-argument', `User is not allowed to delete own account`)

  //すでに登録済みのユーザーチェック
  const existingUserRecord = await checkIfUserExist(email);
  if(!existingUserRecord) {
    throw new functions.https.HttpsError('invalid-argument', `${email}は存在しません。 `)
  }

  // authenticationとfirestoreを削除
  await auth.deleteUser(existingUserRecord.uid)
  await userRepo.deleteUser(existingUserRecord.uid);
  functions.logger.info(`${existingUserRecord.uid}: を削除しました。`)
  return { success: true }; 
});


