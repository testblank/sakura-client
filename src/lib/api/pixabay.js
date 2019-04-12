import axios from "axios";

const API_KEY = "12152292-b1c62c7334c5c3281ea2da2a8";
const TYPE = "photo";
// const PER_PAGE = 12;
const Q = "sakura";

export const getSakura = (per_page = 12) =>
  axios.get(
    `https://pixabay.com/api/?key=${API_KEY}&q=${Q}&image_type=${TYPE}&per_page=${per_page}`
  );
