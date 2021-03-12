import { CommonProperties } from "../../types";
import { Timestamp } from '../../types/common-property';

export interface IProject extends CommonProperties{
  name: string
  url: string
  isPickup: boolean
  skills: string[],
  desc: string,
  displayImage: string,
  startAt: Timestamp | null,
  endAt: Timestamp | null,
  id?: string
}