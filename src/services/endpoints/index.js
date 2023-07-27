import api  from "../api";

const endpoints = {
  getVideos: async () => await api.get("/videos"),
  setLikeVideo: async (videoId) => await api.patch(`/videos/like/${videoId}`),
  setDislikeVideo: async (videoId) => await api.patch(`/videos/dislike/${videoId}`),
  getMe: async () => await api.get("/users/me"),
  registerUser: async (name, email, password) => await api.post("/signup", {name, email, password}),
  loginUser: async (email, password) => await api.post("/signin", {email, password}),
  patchUser: async (name, email) => await api.patch("users/me", {name, email}),
  postVideo: async (videoLink) => await api.post("/videos", {videoLink}),
  updateVideo: async (videoId) => await api.patch(`/videos/${videoId}`),
  deleteVideo: async (videoId) => await api.delete(`/videos/${videoId}`),
  getUsers: async () => await api.get("/users"),
  updateRoles: async (userId, roles) => await api.patch("/users/roles", {userId, roles}),
};

export default endpoints;
