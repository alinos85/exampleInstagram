import { API } from "./api.service";
import axios from "axios";

const userName = "user1";

export async function getPosts() {
  try {
    const response = await API.get(`posts`);
    const items = response.data;
    let posts: any = [];
    items.forEach((post: any) => {
      posts.push(post);
    });
    return posts;
  } catch (e) {
    console.error("There was an error while fetching user posts");
  }
}

//Api call to get a specific Ugram user by his ID
export async function getPost(postID: number) {
  try {
    const response = await API.get(`posts/${postID}`);
    return assemblePost(response.data);
  } catch (e) {
    console.error("There was an error while fecthing this Ugram user");
  }
}

//Api call to POST a user post
export async function createPost(
  userID: number,
  postID: number,
  descript: string,
  createdAt: Date,
  imageURL: string
) {
  const dto = assemblePostToCreate(
    userID,
    postID,
    descript,
    createdAt,
    imageURL
  );
  try {
    const response = await API.request({
      method: "POST",
      url: `posts/${userID}`,
      data: dto,
    });

    return assemblePost(response.data);
  } catch (e) {
    console.error("Error while creating the post");
  }
}

export async function deletePost(id: number) {
  try {
    await API.request({
      method: "DELETE",
      url: `images/${id}`,
    });
  } catch (e) {
    console.error(`Error while deleting post ${id}`);
  }
}

//Api call to get all Ugram users (example from other project)
export async function getUserImages(userName: string) {
  try {
    const response = API.request({
      method: "GET",
      url: `/images`,
      data: {
        userName: userName,
      },
    });
    return response;
  } catch (e) {
    console.error("There was an error while fetching UGram users");
    return e;
  }
}

export async function uploadFile(fileData: {
  file: any;
  mention: string[];
  description: string;
  hashTag: string[];
}) {
  const fileParts = fileData.file.name.split(".");
  const fileName = fileParts[0];
  const fileType = fileParts[1];
  var mentionsAll = [];
  var hashTagsAll = [];
  //transform string array into js objects
  for (let i = 0; i < fileData.mention.length; i++) {
    var newMention = {
      userName: fileData.mention[i],
    };
    mentionsAll.push(newMention);
  }
  for (let i = 0; i < fileData.hashTag.length; i++) {
    var newHashTag = {
      tag: fileData.hashTag[i],
    };
    hashTagsAll.push(newHashTag);
  }

  var data = {
    userName: userName,
    fileName: fileName,
    fileType: fileType,
    imageUrl: "",
    description: fileData.description,
    mention: fileData.mention,
    hashtag: fileData.hashTag,
  };
  try {
    const responseSigned = await API.request({
      method: "POST",
      url: `/postAWS`,
      data: data,
    });
    const returnData = responseSigned.data.data.returnData;
    const URLimage = returnData.signedRequest;
    data.imageUrl = returnData.url;
    const options = {
      headers: {
        "Content-Type": fileType,
        "x-amz-acl": "public-read",
      },
    };
    //send file to s3
    try {
      axios.put(URLimage, fileData.file, options).then((result) => {});
    } catch (e) {
      console.log(e);
      return e;
    }
    //create post in db
    try {
      var dataPost = {
        userId: 1,
        imageUrl: data.imageUrl,
        descript: data.description,
        mentions: mentionsAll,
        hashtags: hashTagsAll,
      };
      API.post("/posts", dataPost)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log("Error while creating new post in db");
        });
    } catch (e) {
      console.log(e);
      return e;
    }
    return data.imageUrl;
  } catch (e) {
    console.error("Error while creating the the request");
    return e;
  }
}

//Function to create a post from the data response of API
function assemblePost(data: any) {
  let post: any = {};
  post.imageURL = data.imageURL ?? "";
  post.userID = data.userID ?? "";
  post.postID = data.postID ?? "";
  post.createdAt = data.createdAt ?? "";
  post.updatedAt = data.updatedAt ?? "";
  post.descript = data.description ?? "";
  return post;
}

//Function to create a post from the data response of API
function assemblePostToCreate(
  userID: number,
  postID: number,
  descript: string,
  createdAt: Date,
  imageURL: string
) {
  return {
    user_id: userID,
    post_id: postID,
    decription: descript,
    created: createdAt,
    image: imageURL,
  };
}
