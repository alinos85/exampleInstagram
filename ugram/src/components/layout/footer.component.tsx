import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import PeopleIcon from "@material-ui/icons/People";
import { Link } from "react-router-dom";
import DynamicFeedSharpIcon from "@material-ui/icons/DynamicFeedSharp";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      flexGrow: 1,
      display: "none",
      width: "100%",
      marginBottom: 0,
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        position: "fixed",
        bottom: 0,
      },
    },
    title: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    toolbar: {
      width: "100%",
      display: "none",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        display: "flex",
      },
    },
    bottomBar: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
    },
    link: {
      textDecoration: "none",
      color: "inherit",
    },
  })
);

export default function Footer() {
  const classes = useStyles();
  const [value, setValue] = React.useState("feed");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={classes.footer}>
      <AppBar position="static" color="transparent">
        <Toolbar disableGutters={true}>
          <Typography variant="h6" className={classes.title}>
            UGram
          </Typography>
          <div className={classes.toolbar}>
            <BottomNavigation
              value={value}
              onChange={handleChange}
              className={classes.bottomBar}
            >
              <BottomNavigationAction
                label="Feed"
                value="feed"
                icon={
                  <Link className={classes.link} to="/">
                    <DynamicFeedSharpIcon fontSize="large" />
                  </Link>
                }
              />
              <BottomNavigationAction
                label="Users"
                value="users"
                icon={
                  <Link className={classes.link} to="/users">
                    <PeopleIcon fontSize="large" />
                  </Link>
                }
              />
              <BottomNavigationAction
                label="Post"
                value="post"
                icon={
                  <Link to="/uploads">
                    <AddBoxOutlinedIcon fontSize="large" />
                  </Link>
                }
              />
              <BottomNavigationAction
                label="Profile"
                value="profile"
                icon={
                  <Link to="/username">
                    <AccountCircleIcon fontSize="large" />
                  </Link>
                }
              />
            </BottomNavigation>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
