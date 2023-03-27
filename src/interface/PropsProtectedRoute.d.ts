import { User } from "firebase/auth";

export interface PropsProtectedRoute {
  children: JSX.Element;
  currentUser: User | null;
}
