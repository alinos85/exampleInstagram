import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";

export default function User(props: {
  profilePicURL: string | undefined;
  userName: string;
  userId: number;
}) {
  const linkAttribute = {
    pathname: "/users/" + props.userName,
    state: {
      name: props.userName,
      src: props.profilePicURL,
      userId: props.userId,
    },
  };
  return (
    <div>
      <ListItem alignItems="flex-start">
        <Link to={linkAttribute}>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={props.profilePicURL} />
          </ListItemAvatar>
        </Link>

        <Link to={linkAttribute}>
          <span>{props.userName}</span>
        </Link>
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
}
