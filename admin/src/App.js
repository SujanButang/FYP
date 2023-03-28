import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Sidebar from "./components/sideBar/Sidebar";
import Home from "./pages/home/Home";
import Hotels from "./pages/hotels/Hotels";
import Users from "./pages/users/Users";
import Events from "./pages/events/Events";
import Posts from "./pages/posts/Posts";

function App() {
  // const { currentUser } = useContext(AuthContext);
  const currentUser = true;

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  };

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div style={{ display: "flex" }}>
          <div className="leftbar" style={{ flex: "1" }}>
            <Sidebar />
          </div>
          <div className="outlet" style={{ flex: "4" }}>
            <Outlet />
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/", element: <Home /> },
        {
          path: "hotels",
          element: <Hotels />,
        },
        {
          path: "users",
          element: <Users />,
        },
        { path: "events", element: <Events /> },
        {
          path: "posts",
          element: <Posts />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
