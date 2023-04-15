import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Leftbar from "./components/leftbar/Leftbar";
import Rightbar from "./components/rightbar/Rightbar";
import Newsfeed from "./pages/newsfeed/Newsfeed";
import Profile from "./pages/profile/Profile";
import "./style.scss";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Chats from "./pages/chats/Chats";
import Messages from "./components/messages/Messages";
import Events from "./pages/events/Events";
import Settings from "./pages/settings/Settings";
import EventDetails from "./pages/eventDetails/EventDetails";
import GroupMessages from "./components/groupMessages/GroupMessages";
import Hotels from "./pages/hotels/Hotels";
import { SocketContextProvider } from "./context/socketContext";
import Feedback from "./components/feedback/Feedback";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/home" />;
    } else {
      return children;
    }
  };

  const { darkMode } = useContext(DarkModeContext);
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <SocketContextProvider>
          <div className={`theme-${darkMode ? "dark" : "light"}`}>
            <div style={{ display: "flex" }}>
              <Leftbar />
              <div style={{ flex: 6 }}>
                <Outlet />
              </div>
              <Rightbar />
            </div>
          </div>
        </SocketContextProvider>
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
        {
          path: "/",
          element: <Newsfeed />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        { path: "/chats/:id", element: <Chats /> },
        { path: "messages/:chatId", element: <Messages /> },
        { path: "/groupchat/:roomId", element: <GroupMessages /> },
        { path: "/events/:userId", element: <Events /> },
        { path: "/settings", element: <Settings /> },
        { path: "/eventDetails/:eventId", element: <EventDetails /> },
        { path: "/hotels", element: <Hotels /> },
        { path: "/feedback/:eventId", element: <Feedback /> },
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
