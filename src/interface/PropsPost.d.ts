import { User } from "firebase/auth";

export interface PropsPost {
  currentUser: User | null;
}
