import { CommonProperties } from '../../types';

export interface ICase extends CommonProperties{
  email:string 
  content: string
  phoneNumber: string
  company: {
    name: string
  }
}