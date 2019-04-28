import axios from "axios";

// list
export const getPostsList = () => axios.get("/api/posts");
// search
export const searchByTitle = title =>
  axios.get("/api/posts/search/title" + title);
export const searchByUsername = username =>
  axios.get("/api/posts/search/username" + username);
// write
export const writePost = ({username, title, text, photo}) =>
  axios.post("/api/posts/write", {username, title, text, photo}
  // , {
  //   headers: {
  //     "content-type": "multipart/form-data"
  //   }
  // }
  );
// delete
export const deletePost = id => axios.delete("/api/posts/" + id);
// update
export const modifyPost = id => axios.patch("/api/posts/" + id);
