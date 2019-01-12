import { put, takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import { AsyncStorage } from 'react-native';

import axios from '../axios';

export function* sendLoginRequest(action) {
  try {
    const response = yield axios.post('/authentication/login', {
      username: action.username,
      password: action.password,
    });
    if (response.data.success) {
      AsyncStorage.multiSet([['token', response.data.token],['username', action.username], ['userId', response.data.userId.toString()]]);
      yield put({
        type: actionTypes.POST_LOGIN,
        username: action.username,
        token: response.data.token,
        userId: response.data.userId,
      });
    } else {
      yield put({ type: actionTypes.SET_LOGIN_ERROR, message: response.data.message });
    }
  } catch (error) {
    debugger;
    yield put({ type: actionTypes.SET_LOGIN_ERROR, message: error.message });
  }
}

export function* getUserDataFromStorage() {
  let userData = yield AsyncStorage.multiGet(['token', 'username','userId']);
  if (userData) {
    yield put({
      type: actionTypes.POST_LOGIN,
      username: userData[1][1],
      token: userData[0][1],
      userId: userData[2][1],
    });
  } else {
    yield put({ type: actionTypes.EXPIRE_SESSION });
  }
}

export function* sendRegisterRequest(action) {
  try {
    const response = yield axios.post('/authentication/register', {
      username: action.username,
      password: action.password,
    });
    if (response.data.success) {
      AsyncStorage.multiSet([['token', action.token],['username', action.username], ['userId', action.userId.toString()]]);
      yield put({
        type: actionTypes.POST_LOGIN,
        username: action.username,
        token: response.data.token,
        userId: response.data.userId,
      });
    } else {
      yield put({ type: actionTypes.SET_REGISTER_ERROR, message: response.data.message });
    }
  } catch (error) {
    yield put({ type: actionTypes.SET_REGISTER_ERROR, message: error.message });
  }
}

export function* verifyToken() {
  try {
    yield axios.get('/authentication/verify');
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      yield put({ type: actionTypes.EXPIRE_SESSION });
    }
  }
}

export function* fetchPopularPlaylists() {
  try {
    const response = yield axios.get('/playlists/');
    yield put({ type: actionTypes.SET_POPULAR_RESULTS, results: response.data });
  } catch (error) {}
}

export function* searchPlaylists(action) {
  try {
    const response = yield axios.get(`/playlists/search?q=${action.query}`);
    yield put({ type: actionTypes.SET_PLAYLIST_RESULTS, results: response.data });
  } catch (error) {}
}

export function* createPlaylist(action) {
  try {
    const response = yield axios.post('/playlists', {
      title: action.title,
      description: action.description,
    });
    if (response.data.id) {
      yield put({ type: actionTypes.CLOSE_ALL_WINDOWS });
      action.history.push(`/playlist/${response.data.id}`);
    }
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      yield put({ type: actionTypes.EXPIRE_SESSION });
    }
  }
}

export function* fetchPlaylist(action) {
  try {
    const response = yield axios.get(`/playlists/${action.playlistId}`, {});
    if (response.data) {
      yield put({ type: actionTypes.SET_INITIAL_PLAYLIST_DATA, playlist: response.data });
    }
  } catch (error) {
    yield put({ type: actionTypes.DISPLAY_SERVER_ERROR });
  }
}

export function* sendMessage(action) {
  try {
    yield axios.post('/chat/send', {
      message: action.message,
      playlistId: action.playlistId,
    });
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      yield put({ type: actionTypes.EXPIRE_SESSION });
    }
  }
}

export function* likeVideo(action) {
  try {
    yield axios.post('/videos/like', {
      videoId: action.videoId,
      value: action.value,
    });
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      yield put({ type: actionTypes.EXPIRE_SESSION });
    }
  }
}

export function* finishVideo(action) {
  try {
    yield axios.post('/videos/finish', {
      videoId: action.videoId,
    });
    yield put({ type: actionTypes.SELECT_NEXT_VIDEO });
  } catch (error) {
    yield put({ type: actionTypes.DISPLAY_SERVER_ERROR });
  }
}

export function* startVideo(action) {
  try {
    yield axios.post('/videos/start', {
      videoId: action.videoId,
    });
  } catch (error) {
    yield put({ type: actionTypes.DISPLAY_SERVER_ERROR });
  }
}

export function* deleteVideo(action) {
  try {
    yield axios.post('/videos/delete', {
      videoId: action.videoId,
    });
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      yield put({ type: actionTypes.EXPIRE_SESSION });
    }
  }
}

export function* sendHeartbeat(action) {
  try {
    const response = yield axios.post('/playlists/heartbeat', {
      playlistId: action.playlist,
      username: action.username,
    });
    if (response.data) {
      yield put({ type: actionTypes.SET_ACTIVE_USERS, users: response.data });
    }
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      yield put({ type: actionTypes.EXPIRE_SESSION });
    }
  }
}

export function* getActiveUsers(action) {
  try {
    const response = yield axios.get(`/playlists/users/${action.playlist}`);
    if (response.data) {
      yield put({ type: actionTypes.SET_ACTIVE_USERS, users: response.data });
    }
  } catch (error) {
    yield put({ type: actionTypes.DISPLAY_SERVER_ERROR });
  }
}

export function* addVideo(action) {
  try {
    yield axios.post('/videos/add', {
      title: action.title,
      youtubeId: action.youtubeId,
      playlistId: action.playlistId,
      autoAdded: action.autoAdded,
    });
    yield put({ type: actionTypes.SET_YOUTUBE_RESULTS, results: [] });
    yield put({ type: actionTypes.SET_YOUTUBE_SEARCH_QUERY, query: '' });
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      yield put({ type: actionTypes.EXPIRE_SESSION });
    }
  }
}

export function* searchYoutube(action) {
  yield put({ type: actionTypes.SET_YOUTUBE_SEARCH_QUERY, query: action.query });
  try {
    const response = yield axios.create({
      baseURL: 'https://www.googleapis.com',
    }).get('/youtube/v3/search', {
      params: {
        q: action.query,
        key: 'AIzaSyDUf-SEv49u9KUvsxZ6jwdjkMdZ1aFjQOI',
        part: 'snippet',
        type: 'video',
        videoSyndicated: true,
        videoEmbeddable: true,
      },
    });
    if (response.data.items) {
      yield put({ type: actionTypes.SET_YOUTUBE_RESULTS, results: response.data.items });
    }
  } catch (error) {
    yield put({ type: actionTypes.DISPLAY_SERVER_ERROR });
  }
}

export function* getRelatedVideos(action) {
  try {
    const response = yield axios.create({
      baseURL: 'https://www.googleapis.com',
    }).get('/youtube/v3/search', {
      params: {
        relatedToVideoId: action.videoId,
        key: 'AIzaSyDUf-SEv49u9KUvsxZ6jwdjkMdZ1aFjQOI',
        part: 'snippet',
        type: 'video',
        maxResults: 10,
        videoSyndicated: true,
        videoEmbeddable: true,
      },
    });
    if (response.data.items) {
      yield put({ type: actionTypes.SET_RELATED_RESULTS, results: response.data.items });
    }
  } catch (error) {
    yield put({ type: actionTypes.DISPLAY_SERVER_ERROR });
  }
}

export function* expireSession() {
  yield put({ type: actionTypes.LOG_OUT });
  yield put({ type: actionTypes.TOGGLE_LOGIN_WINDOW });
  yield put({ type: actionTypes.SET_LOGIN_ERROR, message: 'Your session has expired.' });
}

export default function* rootSaga() {
  yield takeEvery(actionTypes.SEND_LOGIN_REQUEST, sendLoginRequest);
  yield takeEvery(actionTypes.SEND_REGISTER_REQUEST, sendRegisterRequest);
  yield takeEvery(actionTypes.GET_USER_DATA_FROM_STORAGE, getUserDataFromStorage);
  yield takeEvery(actionTypes.FETCH_POPULAR_PLAYLISTS, fetchPopularPlaylists);
  yield takeEvery(actionTypes.SEARCH_PLAYLISTS, searchPlaylists);
  yield takeEvery(actionTypes.CREATE_PLAYLIST, createPlaylist);
  yield takeEvery(actionTypes.FETCH_PLAYLIST, fetchPlaylist);
  yield takeEvery(actionTypes.SEND_MESSAGE, sendMessage);
  yield takeEvery(actionTypes.LIKE_VIDEO, likeVideo);
  yield takeEvery(actionTypes.GET_ACTIVE_USERS, getActiveUsers);
  yield takeEvery(actionTypes.SEND_HEARTBEAT, sendHeartbeat);
  yield takeEvery(actionTypes.ADD_VIDEO, addVideo);
  yield takeEvery(actionTypes.SEARCH_YOUTUBE, searchYoutube);
  yield takeEvery(actionTypes.EXPIRE_SESSION, expireSession);
  yield takeEvery(actionTypes.FINISH_VIDEO, finishVideo);
  yield takeEvery(actionTypes.DELETE_VIDEO, deleteVideo);
  yield takeEvery(actionTypes.VERIFY_TOKEN, verifyToken);
  yield takeEvery(actionTypes.START_VIDEO, startVideo);
  yield takeEvery(actionTypes.GET_RELATED_VIDEOS, getRelatedVideos);
}
