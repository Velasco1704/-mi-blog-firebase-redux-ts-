import { User } from "firebase/auth";

export interface CurrentUserInitialState {
  currentUser: User | null;
}
