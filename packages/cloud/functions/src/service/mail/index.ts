
import { Case } from '../../domain';
import * as functions from 'firebase-functions';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import {EmailData} from "@sendgrid/helpers/classes/email-address";
const fromMailAddress = { email:functions.config().mail.from, name: 'it will rain'}
const adminMailAddress = {email:functions.config().mail.admin, name: 'it will rain admin'}

export const SIGNATURE = `
--------------------------------------<br />
it wil rain<br />
松下剛士 <br />
--------------------------------------<br />
`;

class MailTemplate {
  /**
   * ユーザーに問い合わせ内容確認メールを送信
   * @param _case 
   * @param to 
   * @param from 
   * @returns 
   */
  public contactMailToUser(_case: Case, to:EmailData |EmailData[],  from = fromMailAddress): MailDataRequired {
    const subject = `お問い合わせありがとうございます。`;
    const html = `<p>
    下記内容にてお問い合わせを承りました。<br />
    通常2~3日以内に返信させていただきます。<br />
    <br />
    ${_case.phoneNumber && '電話番号:'  + _case.phoneNumber + '<br />'}
    ${_case.company && _case.company.name && '会社名:'  + _case.company.name + '<br />'}
    ${_case.content && 'お問い合わせ内容 :' + _case.content + '<br />' } 
    </p>
    <br />
    ${SIGNATURE}`
    return { subject, html, from, to}
  }

  /**
   * 管理者に問い合わせ内容メールを送信
   * @param _case 
   * @param to 
   * @param from 
   * @returns 
   */
  public contactMailToAdmin(_case: Case, to = adminMailAddress,  from = functions.config().mail.from): MailDataRequired {
    const subject = `お問い合わせがありました。`;
    const html = `<p>
    下記内容でお問い合わせがありました。
    ${_case.email && '電話番号:'  + _case.email + '<br />'}
    ${_case.phoneNumber && '電話番号:'  + _case.phoneNumber + '<br />'}
    ${_case.company && _case.company.name && '会社名:'  + _case.company.name + '<br />'}
    ${_case.content && 'お問い合わせ内容 :' + _case.content + '<br />' } 
    </p>
    <br />
    ${SIGNATURE}`
    return { subject, html,from, to}
  }
}

export const mailTemplate = new MailTemplate();