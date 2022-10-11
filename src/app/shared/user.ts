import {Agent} from "./agent";

export interface User extends Agent{
  role?:string;
  password?:string;
}
