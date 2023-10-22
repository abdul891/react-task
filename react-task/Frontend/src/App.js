import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style.css";
import Login from "./comnponents/login/Login";
import Dashboard from "./comnponents/Dashboard/Dashboard";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./routes/routes";

export const router = createBrowserRouter([...routes]);

function App() {
  return (
 
      <RouterProvider router={router}>
        <Login />
        <Dashboard />
      </RouterProvider>

  );
}

export default App;
