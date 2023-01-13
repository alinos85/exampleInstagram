import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import { getUserImages } from "../../services/users.service";
//import GridList from "@material-ui/core/GridList";
import "./user-profile.scss";

export default class User extends React.Component<
  { location: { state: { userId: number; src: string; name: string } } },
  { images: { imageUrl: string; descript: string }[] }
> {
  constructor(props: {
    location: { state: { userId: number; src: string; name: string } };
  }) {
    super(props);

    this.state = {
      images: [{ imageUrl: "", descript: "" }],
    };
  }

  componentDidMount() {
    const userId = this.props.location.state.userId;
    getUserImages(userId)
      .then((items) => {
        const images = items.data;
        this.setState({ images });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const src = this.props.location.state.src;
    const name = this.props.location.state.name;
    return (
      <div>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={src} />
          </ListItemAvatar>
          <ListItemText
            primary={name}
            secondary={<React.Fragment>{" — followed by ..."}</React.Fragment>}
          />
        </ListItem>

        <div>
          <Grid container spacing={3}>
            {this.state.images.map((image) => (
              <Grid item key={image.imageUrl}>
                <ButtonBase className="images">
                  <img
                    className="imgs"
                    src={image.imageUrl}
                    alt={image.descript}
                  />
                </ButtonBase>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    );
  }
}
