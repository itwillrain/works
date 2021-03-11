import * as functions from "firebase-functions";
import * as admin from 'firebase-admin'
import { RegisterUserDto } from '@works/core';
import { UserRepo } from '../../../domain/users/repo';
import { User } from '../../../domain/users/model';
import { checkIfUserExist } from '.';
const auth = admin.auth();
const db = admin.firestore();
const userRepo = new UserRepo(db)

export const register = functions.region(functions.config().locale.region).https.onCall(async (data, context) => {
  functions.logger.info(`start to exec register user function`)
  const { user, buildingId, manageBuildingIds, password  } = new RegisterUserDto(data);
  console.log(manageBuildingIds)
  const {email, role} = user;
  // 認証チェック
  if (!context.auth) {
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' + 'while authenticated.');
  }
  // 管理権限チェック
  if(context.auth.token.role !== 'systemAdmin' && context.auth.token.role !== 'owner') {
    throw new functions.https.HttpsError('failed-precondition', `The function must be called while "systemAdmin" or "owner"`)
  }

  // ownerはuserしか追加できない
  if(context.auth.token.role === 'owner' && user.role !== 'user') {
    throw new functions.https.HttpsError('failed-precondition', `The function must be called while "systemAdmin" or "owner"`)
  }

  //すでに登録済みのユーザーがないかチェック
  const existingUserRecord = await checkIfUserExist(user.email);
  if(!!existingUserRecord) {
    throw new functions.https.HttpsError('already-exists', `already exist: ${existingUserRecord.uid}`)
  }

  // 管理者登録
  const userRecord = await auth.createUser({email, emailVerified: true, password})
  if(userRecord) {
    await auth.setCustomUserClaims(userRecord.uid, {role, manageBuildingIds})
    const newUser = new User(user, userRecord.uid)
    newUser.setBuilding(buildingId)
    newUser.setManageBuildings(manageBuildingIds)
    const actionCodeSettings = { url: functions.config().admin.base_url };
    const link = await auth.generatePasswordResetLink(email, actionCodeSettings)
    await userRepo.createUser(newUser);
    functions.logger.log({link})
  }
  return { success: true };
});

