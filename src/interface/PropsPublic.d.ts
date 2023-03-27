import { User } from "firebase/auth";

export interface PropsPublic {
  currentUser: User | null;
}
