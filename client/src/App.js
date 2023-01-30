import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Leftbar from "./components/leftbar/Leftbar";
import Rightbar from "./components/rightbar/Rightbar";
import Newsfeed from "./pages/newsfeed/Newsfeed";
import Profile from "./pages/profile/Profile";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  Outlet
} from "react-router-dom";

function App() {
  const currentUser = true;

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/home" />;
    } else {
      return children;
    }
  };

  const Layout =()=>{
    return(
      <div>
        <Navbar/>
        <div style={{display: "flex"}}>
          <Leftbar/>
          <div style={{flex:6}}>
          <Outlet/>
          </div>
          <Rightbar/>
        </div>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path:"/",
      element: <ProtectedRoute><Layout/></ProtectedRoute>,
      children:[{
        path:"/newsfeed",
        element: <Newsfeed/>
      },
        {
          path:"/profile/:id",
          element: <Profile/>
        }
      ],
    },
    { path: "/home", element: <Home /> },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
