import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { CaseRepo, Case } from '../../domain';
import sgMail from '@sendgrid/mail'
import { mailTemplate } from '../../service/mail/index'
import { ContactDto } from '@works/core';
sgMail.setApiKey(functions.config().sendgrid.key)

export const contact = functions.region(functions.config().locale.region).https.onCall(async(data, context)=> {
  const {content, company, phoneNumber, email, PIC} = new ContactDto(data)
  if(!context.auth)   throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' + 'while authenticated.');
  if(!email) throw new functions.https.HttpsError('failed-precondition', 'need email address')

  const db = admin.firestore();
  const caseRepo = new CaseRepo(db)
  const _case = new Case({content, company, phoneNumber, email, PIC}, '')
  const ref =await caseRepo.createCase(_case)
  functions.logger.info(`create Case: ${ref.id}`)

  try {
    const msg1 = mailTemplate.contactMailToUser(_case, {name: 'it will rain', email})
    const msg2 = mailTemplate.contactMailToAdmin(_case)
    const [[res1],[res2]] =await Promise.all( [sgMail.send(msg1), sgMail.send(msg2)]);
    functions.logger.info(res1.toString())
    functions.logger.info(res2.toString())
  } catch(err) {
    console.log(err)
    throw new functions.https.HttpsError('internal', 'could not send', err)
  }
  return {success: true}
})