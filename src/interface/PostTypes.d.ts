import { PostFormTypes } from "./PostFormTypes";

export interface PostTypes extends PostFormTypes {
  id: string;
  createdBy: string;
  timeStamp: string;
}
