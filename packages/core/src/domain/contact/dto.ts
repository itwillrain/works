import { assertIsDefined } from '../../utils/assert';

/**
 * ContactDto
 * @export
 */
export class ContactDto {
  readonly email!: string
  readonly content!: string
  readonly phoneNumber!: string 
  readonly company!: { name: string }
  readonly PIC!: string

  constructor(data: any) {
    data.hasOwnProperty('email') ? this.email = data.email : assertIsDefined(data.email)
    data.hasOwnProperty('content') ? this.content = data.content : assertIsDefined(data.content)
    data.hasOwnProperty('phoneNumber') ? this.phoneNumber = data.phoneNumber : assertIsDefined(data.phoneNumber)
    data.hasOwnProperty('company') ? this.company = data.company : assertIsDefined(data.company)
    data.company.hasOwnProperty('name') ||  assertIsDefined(data.company)
    data.hasOwnProperty('PIC') ? this.PIC = data.PIC : assertIsDefined(data.PIC)
  }
}




