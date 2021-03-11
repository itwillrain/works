import { CommonProperties } from "../../types";

export interface IProject extends CommonProperties{
  name: string
  url: string
  id?: string
}