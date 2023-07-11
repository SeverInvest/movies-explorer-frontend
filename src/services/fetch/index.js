import {
  actionFetchVideosLoading,
  actionFetchVideosSuccess,
  actionFetchVideosError,
  actionSetVideoLike
} from "../../store/slices/videosSlice";
import {
  fetchUserLoading,
  fetchUserSuccess,
  fetchUserError,
  setUserVideo
} from "../../store/slices/userSlice";
import endpoints from "../endpoints";

export async function fetchVideos(dispatch) {
  try {
    dispatch(actionFetchVideosLoading());
    const response = await endpoints.getVideos();
    dispatch(actionFetchVideosSuccess(response.data))
  } catch (error) {
    dispatch(actionFetchVideosError(error.message));
  }
}

export async function setLike(dispatch, videoId) {
  try {
    const response = await endpoints.setLikeVideo(videoId);
    dispatch(actionSetVideoLike(response.data.video));
    dispatch(setUserVideo(response.data.user));
  } catch (error) {
    dispatch(actionFetchVideosError(error.message));
  }
}

export async function setDisike(dispatch, videoId) {
  try {
    const response = await endpoints.setDislikeVideo(videoId);
    dispatch(actionSetVideoLike(response.data.video));
    dispatch(setUserVideo(response.data.user));
  } catch (error) {
    dispatch(actionFetchVideosError(error.message));
  }
}

export async function me(dispatch) {
  try {
    dispatch(fetchUserLoading(true));
    const response = await endpoints.getMe();
    dispatch(fetchUserSuccess(response.data))
    return response;
  } catch (error) {
    dispatch(fetchUserError(error.message));
  } finally {
    dispatch(fetchUserLoading(false));
  }
}

export async function login(dispatch, email, password) {
  try {
    dispatch(fetchUserLoading(true));
    return await endpoints.loginUser(email, password);
  } catch (error) {
    dispatch(fetchUserError(error.message));
  } finally {
    dispatch(fetchUserLoading(false));
  }
}

export async function register(dispatch, name, email, password) {
  try {
    dispatch(fetchUserLoading(true));
    return await endpoints.registerUser(name, email, password);
  } catch (error) {
    dispatch(fetchUserError(error.message));
  } finally {
    dispatch(fetchUserLoading(false));
  }
}

export async function setChangeUser(dispatch, name, email) {
try {
    dispatch(fetchUserLoading(true));
    const response = await endpoints.patchUser(name, email);
    dispatch(fetchUserSuccess(response.data))
  } catch (error) {
    dispatch(fetchUserError(error.message));
  } finally {
    dispatch(fetchUserLoading(false));
  }
}