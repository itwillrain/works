import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { CaseRepo, Case } from '../../domain';
import sgMail from '@sendgrid/mail'
import { mailTemplate } from '../../service/mail/index'
sgMail.setApiKey(functions.config().sendgrid.key)

export const contact = functions.region(functions.config().locale.region).https.onCall(async(data, context)=> {
  const {content, company, phoneNumber} = data;
  const {email} = context.auth!.token
  if(!email) throw new functions.https.HttpsError('failed-precondition', 'need email address')

  const db = admin.firestore();
  const caseRepo = new CaseRepo(db)
  const _case = new Case({content, company, phoneNumber, email}, '')
  const ref =await caseRepo.createCase(_case)
  functions.logger.info(`create Case: ${ref.id}`)

  try {
    const msg = mailTemplate.contactMailToUser(_case, {name: 'it will rain', email})
    const msg2 = mailTemplate.contactMailToAdmin(_case)
    const [res] = await sgMail.send(msg)
  functions.logger.info(res.toString())
  } catch(err) {
    console.log(err)
    throw new functions.https.HttpsError('internal', 'could not send', err)
  }
  return {success: true}
})