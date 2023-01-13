import { API } from "./api.service";
//import axios from 'axios'

//Api call to get all Ugram users (example from other project)
export async function getUsers() {
  try {
    const response = await API.get(`/users`); //users limit will be the max amount returned by res, so all accounts.
    return response;
  } catch (e) {
    console.error("There was an error while fetching UGram users");
    return e;
  }
}

//Api call to get all Ugram users (example from other project)
export async function getUserImages(userId: number) {
  console.log(
    "appel........................................................................................"
  );
  try {
    const response = API.request({
      method: "GET",
      url: `/images`,
      data: {
        userId: userId,
      },
    });
    return response;
  } catch (e) {
    console.error("There was an error while fetching UGram users");
    return e;
  }
}

//Api call to get a specific Ugram user by his ID
export async function getUser(userID: number) {
  try {
    const response = await API.get(`users/${userID}`);
    return assembleUser(response.data);
  } catch (e) {
    console.error("There was an error while fecthing this Ugram user");
  }
}

//Api call to get a specific post by its postID
export async function getPost(postID: number) {
  try {
    const response = await API.get(`posts/${postID}`);

    return assemblePost(response.data);
  } catch (e) {
    console.error("There was an error while fecthing this post");
  }
}

//Function to create a user from the data response of API (example from other projetc)
function assembleUser(data: any) {
  let user: any = {};
  user.email = data[0].email ?? "";
  user.firstName = data[0].name ?? "";
  user.lastName = data[0].name ?? "";
  user.userName = data[0].userName ?? "";
  // user.userID = data.userID ?? "";
  user.phone = data[0].phone ?? "";
  user.profilePicURL = data[0].profilePicURL ?? "";
  return user;
}

//Function to create a post from the data response of API
function assemblePost(data: any) {
  let post: any = {};

  post.userID = data[0].userId ?? "";
  post.postID = data[0].imageId ?? "";
  post.description = data[0].descript ?? "";
  post.datePosted = data[0].createdAt ?? "";
  post.imageURL = data[0].imageUrl ?? "";
  post.mentions = data[2] ?? "";
  post.hashtags = data[1] ?? "";
  return post;
}
