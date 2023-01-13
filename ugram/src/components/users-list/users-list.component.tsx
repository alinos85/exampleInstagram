import React from "react";
import List from "@material-ui/core/List";
import "./users-list.scss";
import User from "../user/user.component";
import { getUsers } from "../../services/users.service";

export default class Users extends React.Component<{}, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    getUsers()
      .then((res) => {
        const data: any = res.data;
        const users = data;
        this.setState({
          users,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <List>
          {" "}
          <div>Suggestion de contacts</div>
          {this.state.users.map(
            (user: {
              userName: string;
              profilePicURL: string | undefined;
              userId: number;
            }) => (
              <User
                key={user.userName}
                userName={user.userName}
                profilePicURL={user.profilePicURL}
                userId={user.userId}
              />
            )
          )}
        </List>
      </div>
    );
  }
}
