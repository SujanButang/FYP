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
import Single from "./pages/single/Single";
import SingleEvent from "./pages/singleEvent/SingleEvent";
import SingleHotel from "./pages/singleHotel/SingleHotel";
import Payments from "./pages/payments/Payments";
import VerificationRequests from "./pages/verificationRequests/VerificationRequests";
import SingleRequest from "./components/singleRequest/SingleRequest";

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
          <div className="outlet" style={{ flex: "5" }}>
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
          path: "single",
          element: <Single />,
        },
        {
          path: "singleEvent",
          element: <SingleEvent />,
        },
        {
          path: "singleHotel",
          element: <SingleHotel />,
        },
        {
          path: "posts",
          element: <Posts />,
        },
        { path: "payments", element: <Payments /> },
        { path: "verification", element: <VerificationRequests /> },
        { path: "/singleRequest", element: <SingleRequest /> },
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
