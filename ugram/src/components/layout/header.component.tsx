import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import PeopleIcon from "@material-ui/icons/People";
import { Link } from "react-router-dom";
import DynamicFeedSharpIcon from "@material-ui/icons/DynamicFeedSharp";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    logo: {
      flexGrow: 1,
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        justifyContent: "center",
      },
    },
    link: {
      textDecoration: "none",
      color: "inherit",
    },
  })
);

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar disableGutters={true}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="default"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.logo}>
            <img src="logo.png" alt="UGram" style={{ width: "50px" }} />
          </div>

          <Link className={classes.link} to="/">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <DynamicFeedSharpIcon fontSize="large" />
            </IconButton>
          </Link>

          <Link className={classes.link} to="/users">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <PeopleIcon fontSize="large" />
            </IconButton>
          </Link>

          <Link to="/uploads">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <AddBoxOutlinedIcon fontSize="large" />
            </IconButton>
          </Link>

          <Link to="/username">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <AccountCircleIcon fontSize="large" />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
