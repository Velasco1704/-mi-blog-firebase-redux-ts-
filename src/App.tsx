import { Home } from "@pages/Home";
import { Login } from "@pages/Login";
import { Public } from "@pages/Public";
import { ProtectedRoute } from "./ProtectedRoute";
import { Routes, Route } from "react-router";
import { useSelector } from "react-redux";
import { type RootState } from "@app/store";

export const App = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute currentUser={currentUser}>
              <Home currentUser={currentUser} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-post"
          element={
            <ProtectedRoute currentUser={currentUser}>
              <Public currentUser={currentUser} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};
