import { RegisterPostData } from "./auth";

export interface User extends RegisterPostData {
   id:string;
}