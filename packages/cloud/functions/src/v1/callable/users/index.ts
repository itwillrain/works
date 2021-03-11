
export * from './register'
export * from './delete'

import * as functions from "firebase-functions";
import * as admin from 'firebase-admin'
const auth = admin.auth();

/**
 * すでに登録済みのユーザーのメールアドレスをチェック
 * @param {string[]} emails 
 * @return {Promise<string[]>}
 */
export  async function checkIfUserExist(email:string): Promise<admin.auth.UserRecord | null> {
  try {
    const existUser = await auth.getUserByEmail(email)
    functions.logger.info(`${email} is already exist!`)
    return existUser
  } catch(err){
    functions.logger.info(`${email} is not exist!`)
    return null
  }
}


