import { User } from "firebase/auth";

export interface PropsHome {
  currentUser: User | null;
}
