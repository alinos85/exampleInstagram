import React from "react";
import "./feed.scss";
import GridList from "@material-ui/core/GridList";
import Post from "./post.component";
import { getPosts } from "../../services/posts.service";

export default class Feed extends React.Component<{}, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      posts: [],
      userId: 1,
    };
  }

  async getFeed() {
    await getPosts().then((items) => {
      const posts = items.map(
        (
          post: {
            imageId: number;
            descript: string;
            imageUrl: string;
            userId: number;
            createdAt: string;
            hashtags: [];
          },
          index: number
        ) => (
          <Post
            key={index}
            id={post.imageId}
            title={post.descript}
            img={post.imageUrl}
            author={post.userId}
            date={post.createdAt}
            tags={post.hashtags}
            user={this.state.userId}
          />
        )
      );

      this.setState({
        posts,
      });
    });
  }

  componentDidMount() {
    this.getFeed();
  }

  render() {
    return (
      <div className="feed">
        <GridList classes={{ root: "gridList" }} style={{ margin: 0 }}>
          {this.state.posts}
        </GridList>
      </div>
    );
  }
}
