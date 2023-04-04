import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EventIcon from "@mui/icons-material/Event";
import StoreIcon from "@mui/icons-material/Store";
import ArticleIcon from "@mui/icons-material/Article";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import ForumIcon from "@mui/icons-material/Forum";
import SettingsIcon from "@mui/icons-material/Settings";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 260;

export default function Sidebar() {
  const menu1 = [
    { menu: "Dashboard", link: "/" },
    { menu: "Users", link: "/users" },
    { menu: "Events", link: "/events" },
    { menu: "Hotels", link: "/hotels" },
    { menu: "Posts", link: "/posts" },
  ];
  const menu2 = [
    { menu: "Messages", link: "/messages" },
    { menu: "Verification Requests", link: "/verification" },
    { menu: "Payments Collected", link: "/payments" },
  ];
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Typography variant="h5" style={{ fontWeight: 500 }}>
          Travel Sathi Admin
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menu1.map((men, index) => (
          <div key={index}>
            <Link
              to={men.link}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem key={men.menu} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ListItemIcon>
                      {(() => {
                        switch (index) {
                          case 0:
                            return <DashboardIcon />;
                          case 1:
                            return <PeopleAltIcon />;
                          case 2:
                            return <EventIcon />;
                          case 3:
                            return <StoreIcon />;
                          default:
                            return <ArticleIcon />;
                        }
                      })()}
                    </ListItemIcon>
                  </ListItemIcon>
                  <ListItemText primary={men.menu} />
                </ListItemButton>
              </ListItem>
            </Link>
          </div>
        ))}
      </List>
      <Divider />
      <List>
        {menu2.map((men, index) => (
          <div key={index}>
            <Link
              to={men.link}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {(() => {
                      switch (index) {
                        case 0:
                          return <ForumIcon />;
                        case 1:
                          return <DomainVerificationIcon />;
                        default:
                          return <PriceCheckIcon />;
                      }
                    })()}
                  </ListItemIcon>
                  <ListItemText primary={men.menu} />
                </ListItemButton>
              </ListItem>
            </Link>
          </div>
        ))}
      </List>
      <Divider />
      <List sx={{ marginTop: "auto" }}>
        <ListItem key="Settings" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
