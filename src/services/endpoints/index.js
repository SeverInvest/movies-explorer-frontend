import api  from "../api";

const endpoints = {
  getVideos: async () => await api.get("/videos"),
  setLikeVideo: async (_, videoId) => await api.patch(`/videos/like/${videoId}`),
  setDislikeVideo: async (_, videoId) => await api.patch(`/videos/dislike/${videoId}`),
  getMe: async () => await api.get("/users/me"),
  registerUser: async () => await api.post("/signup"),
  loginUser: async (_, email, password) => await api.post("/signin", {email, password}),
  patchUser: async (_, name, email) => await api.patch("/me", {name, email}),
};

export default endpoints;
