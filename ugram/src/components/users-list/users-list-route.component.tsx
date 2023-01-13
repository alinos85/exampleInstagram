import UserProfile from "../user-profile/user-profile.component";
import { Route } from "react-router-dom";
import List from "@material-ui/core/List";
import React, { useState, useEffect } from "react";
import { getUsers } from "../../services/users.service";

export default function UsersProfileRoute() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then((value) => {
        setUsers(value.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  });

  return (
    <List>
      {users.map((user: { userName: string; userId: number }) => {
        return (
          <Route path={"/" + user.userName} exact component={UserProfile} />
        );
      })}
    </List>
  );
}
