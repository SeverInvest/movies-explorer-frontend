import api  from "../api";

const endpoints = {
  getVideos: async () => await api.get("/videos"),
  setLikeVideo: async (_, videoId) => await api.patch(`/videos/like/${videoId}`),
  setDislikeVideo: async (_, videoId) => await api.patch(`/videos/dislike/${videoId}`),
  getMe: async () => await api.get("/users/me"),
  registerUser: async (_, name, email, password) => await api.post("/signup", {name, email, password}),
  loginUser: async (_, email, password) => await api.post("/signin", {email, password}),
  patchUser: async (_, name, email) => await api.patch("users/me", {name, email}),
};

export default endpoints;
