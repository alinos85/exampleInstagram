import {
  createStyles,
  Fade,
  GridListTile,
  GridListTileBar,
  makeStyles,
  Theme,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { deletePost } from "../../services/posts.service";
import { getUser } from "../../services/users.service";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
      width: 300,
      height: 300,
      [theme.breakpoints.down("sm")]: {
        marginRight: theme.spacing(0),
        marginBottom: theme.spacing(2),
      },
    },
    tilebar: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

function Post(props: {
  key: number;
  id: number;
  title: string;
  img: string;
  author: number;
  date: string;
  tags: [];
  user: number;
}) {
  const classes = useStyles();
  const history = useHistory();
  const [isShown, setIsShown] = useState(false);
  const [isCurrentUser, setCurrentUser] = useState(false);
  const [username, setUsername] = React.useState(null);

  React.useEffect(() => {
    if (props.user === props.author) {
      setCurrentUser(true);
    }

    getUser(props.author).then((user) => {
      setUsername(user.userName);
    });
  }, [props.user, props.author]);

  function removePost() {
    deletePost(props.id);
    window.location.reload();
  }

  function openDetails() {
    history.push(`details/${props.id}`);
  }

  return (
    <GridListTile
      key={props.key}
      className={classes.root}
      onClick={() => setIsShown(true)}
      onDoubleClick={() => openDetails()}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <img src={props.img} alt={props.title} />

      {isShown && (
        <Fade in={isShown} timeout={{ enter: 350 }}>
          <GridListTileBar
            title={props.title}
            subtitle={
              <span className={classes.tilebar}>
                <div onClick={() => openDetails()}>
                  {username} - {props.date}
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {props.tags.map((item: { tag: string }, index: number) => {
                      return <span key={index}>{item.tag} </span>;
                    })}
                  </div>
                </div>
                {isCurrentUser && (
                  <div>
                    <IconButton color="primary" onClick={() => removePost()}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                )}
              </span>
            }
          />
        </Fade>
      )}
    </GridListTile>
  );
}

export default Post;
