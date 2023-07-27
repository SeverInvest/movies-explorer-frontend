import {
  actionFetchVideosLoading,
  actionFetchVideosSuccess,
  actionFetchVideosError,
  actionFetchRemoveVideo,
} from "../../store/slices/videosSlice";
import {
  fetchUserLoading,
  fetchUserSuccess,
  fetchUserError,
  setUserVideo,
} from "../../store/slices/userSlice";
import {
  actionVisiblePopupAlarm,
} from "../../store/slices/popupSlice";
import {
  actionFetchUsersSuccess,
  actionFetchUsersError,
} from "../../store/slices/usersSlice";
import endpoints from "../endpoints";

export async function fetchVideosAndUsers(dispatch) {
  try {
    dispatch(actionFetchVideosLoading(true));
    const response1 = await endpoints.getVideos();
    const response2 = await endpoints.getUsers();
    dispatch(actionFetchVideosSuccess(response1.data))
    dispatch(actionFetchUsersSuccess(response2.data))
  } catch (error) {
    dispatch(actionFetchVideosError(error.response.data.message));
  } finally {
    dispatch(actionFetchVideosLoading(false));
  }
}

export async function setLike(dispatch, videoId) {
  try {
    const response = await endpoints.setLikeVideo(videoId);
    dispatch(actionFetchVideosSuccess(response.data.video));
    dispatch(setUserVideo(response.data.user));
  } catch (error) {
    dispatch(actionFetchVideosError(error.response.data.message));
  }
}

export async function setDisike(dispatch, videoId) {
  try {
    const response = await endpoints.setDislikeVideo(videoId);
    dispatch(actionFetchVideosSuccess(response.data.video));
    dispatch(setUserVideo(response.data.user));
  } catch (error) {
    dispatch(actionFetchVideosError(error.response.data.message));
  }
}

export async function me(dispatch) {
  try {
    dispatch(fetchUserLoading(true));
    const response = await endpoints.getMe();
    dispatch(fetchUserSuccess(response.data))
    return response;
  } catch (error) {
    dispatch(fetchUserError(error.response.data.message));
  } finally {
    dispatch(fetchUserLoading(false));
  }
}

export async function login(dispatch, email, password) {
  try {
    dispatch(fetchUserLoading(true));
    return await endpoints.loginUser(email, password);
  } catch (error) {
    dispatch(fetchUserError(error.response.data.message));
  } finally {
    dispatch(fetchUserLoading(false));
  }
}

export async function register(dispatch, name, email, password) {
  try {
    dispatch(fetchUserLoading(true));
    return await endpoints.registerUser(name, email, password);
  } catch (error) {
    dispatch(fetchUserError(error.response.data.message));
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
    dispatch(fetchUserError(error.response.data.message));
  } finally {
    dispatch(fetchUserLoading(false));
  }
}

export async function createVideo(dispatch, videoLink) {
  try {
    dispatch(actionFetchVideosLoading(true));
    const response = await endpoints.postVideo(videoLink);
    dispatch(actionFetchVideosSuccess(response.data))
    dispatch(actionVisiblePopupAlarm("Видео успешно добавлено"));
  } catch (error) {
    dispatch(actionFetchVideosError(error.response.data.message));
    dispatch(actionVisiblePopupAlarm(error.response.data.message));
  } finally {
    dispatch(actionFetchVideosLoading(false));
  }
}

export async function updateVideo(dispatch, videoId) {
  try {
    dispatch(actionFetchVideosLoading(true));
    const response = await endpoints.updateVideo(videoId);
    dispatch(actionFetchVideosSuccess(response.data))
    dispatch(actionVisiblePopupAlarm("Видео успешно обновлено"));
  } catch (error) {
    dispatch(actionFetchVideosError(error.response.data.message));
    dispatch(actionVisiblePopupAlarm(error.response.data.message));
  } finally {
    dispatch(actionFetchVideosLoading(false));
  }
}

export async function removeVideo(dispatch, videoId) {
  try {
    dispatch(actionFetchVideosLoading(true));
    const response = await endpoints.deleteVideo(videoId);
    dispatch(actionFetchRemoveVideo(response.data.data._id));
    dispatch(actionVisiblePopupAlarm("Видео удалено"));
  } catch (error) {
    dispatch(actionFetchVideosError(error.response.data.message));
    dispatch(actionVisiblePopupAlarm(error.response.data.message));
  } finally {
    dispatch(actionFetchVideosLoading(false));
  }
}

export async function updateRoles(dispatch, userId, roles) {
  try {
    dispatch(fetchUserLoading(true));
    const response = await endpoints.updateRoles(userId, roles);
    dispatch(actionFetchUsersSuccess(response.data))
  } catch (error) {
    dispatch(actionFetchUsersError(error.response.data.message));
  } finally {
    dispatch(fetchUserLoading(false));
  }
}