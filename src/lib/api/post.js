import axios from "axios";

// list
export const getPostsList = () => axios.get("/api/posts");
// search
export const searchByTitle = title =>
  axios.get("/api/posts/search/title" + title);
export const searchByUsername = username =>
  axios.get("/api/posts/search/username" + username);
// write
export const writePost = values =>
  axios.post("/api/posts/write", {
    headers: { "Content-type": "application/x-www-form-urlencoded" },
    values
  });
// delete
export const deletePost = id => axios.delete("/api/posts/" + id);
// update
export const modifyPost = id => axios.patch("/api/posts/" + id);
