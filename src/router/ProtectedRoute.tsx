import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const authenticated = localStorage.getItem("token");
  console.log(authenticated, "this is the token")
  if (authenticated !== null) {
    return <>{children}</>;
  } else {
    return <Navigate to="/dashboard_" />;
 }
}