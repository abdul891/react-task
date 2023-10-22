import Dashboard from "../comnponents/Dashboard/Dashboard";
import Login from "../comnponents/login/Login";
import TypeForm from "../comnponents/Form/TypeForm";
import RootErrorBoundary from "./RootErrorBoundary";
import ProtectedRoute from "./ProtectedRoute";


const routes = [
  {
    path: "/",
    element: <Login />,
    errorElement: <RootErrorBoundary />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute path="/" element={<Dashboard />} />,
  },

  {
    path: "/create-test/:id?",
    element: <ProtectedRoute path="/" element={ <TypeForm />} />,
  },
];

export default routes;
