import React from "react";
import { RouteComponentProps } from "react-router";
import { getPost } from "../services/users.service";

interface IMyProps {
  post: {
    userID: number;
    postID: number;
    description: string;
    hashtags: [];
    datePosted: string;
    imageURL: string;
    mentions: [];
  };
}

interface IReactRouterParams {
  id: string;
}

export default class ImageDetails extends React.Component<
  RouteComponentProps<IReactRouterParams>,
  IMyProps
> {
  constructor(props: any) {
    super(props);

    this.state = {
      post: {
        userID: 0,
        postID: 0,
        description: "",
        hashtags: [],
        datePosted: "",
        imageURL: "",
        mentions: [],
      },
    };
  }

  async getDetails(id: string) {
    var imageId: number = +id;

    await getPost(imageId).then((res) => {
      this.setState({
        post: {
          userID: res["userID"],
          postID: res["postID"],
          description: res["description"],
          hashtags: res["hashtags"],
          datePosted: res["datePosted"],
          imageURL: res["imageURL"],
          mentions: res["mentions"],
        },
      });
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.getDetails(id);
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={this.state.post.imageURL}
          alt="unknown"
          style={{ width: "80vw", marginTop: "5vh" }}
        />
        <div
          style={{
            display: "flex",
            width: "80vw",
            alignItems: "space-between",
            flexDirection: "column",
            marginTop: "5vh",
          }}
        >
          <div>Date : {this.state.post.datePosted}</div>
          <div>Description : {this.state.post.description}</div>

          <div>
            Hashtags:{" "}
            {this.state.post.hashtags.map(
              (item: { tag: string }, index: number) => {
                return <span key={index}>{item.tag} </span>;
              }
            )}
          </div>

          <div>
            Mentions :{" "}
            {this.state.post.mentions.map(
              (item: { userName: string }, index: number) => {
                return (
                  <span key={index}>
                    {"@"}
                    {item.userName}{" "}
                  </span>
                );
              }
            )}
          </div>
        </div>
      </div>
    );
  }
}
