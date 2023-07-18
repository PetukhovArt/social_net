import { v1 } from "uuid";
import { Dispatch } from "redux";
import { RootActionTypes } from "redux/store-redux";
import {getProfileResponseType, profileAPI} from 'api/api';
import { setFollowingProgress } from "redux/users-reducer";
import { setIsLoadingAC } from "redux/app-reducer";

//ACTION CREATORS ======================================================================
const ADD_POST = "profile/ADD-POST";
const DELETE_POST = "profile/DELETE-POST";
const SET_USER_PROFILE = "profile/SET-USER-PROFILE";
const SET_USER_STATUS = "profile/SET-USER-STATUS";
const UPDATE_USER_STATUS = "profile/UPDATE-USER-STATUS";
const UPDATE_USER_PHOTO = "profile/UPDATE-USER-PHOTO";

export const addPost = (postText: string) => ({ type: ADD_POST, newPost: postText } as const);

export const deletePost = (postId: string) => ({ type: DELETE_POST, postId } as const);
export const setUserProfile = (profileValue: getProfileResponseType) =>
  ({ type: SET_USER_PROFILE, profileValue } as const);
export const setUserStatus = (status: string) => ({ type: SET_USER_STATUS, status } as const);
export const updateUserStatus = (status: string) => ({ type: UPDATE_USER_STATUS, status } as const);
export const updateUserPhoto = (photos: photosType) => ({ type: UPDATE_USER_PHOTO, photos } as const);

//THUNK CREATORS ======================================================================
export const getProfileTC = (userId: number) => async (dispatch: Dispatch<RootActionTypes>) => {
  dispatch(setIsLoadingAC(true));
  dispatch(setFollowingProgress(+userId, true));
  const data = await profileAPI.getProfile(userId);
  dispatch(setUserProfile(data));
  dispatch(setIsLoadingAC(false));
};
export const getUserStatusTC = (userId: number) => async (dispatch: Dispatch<RootActionTypes>) => {
  const data = await profileAPI.getStatus(userId);
  dispatch(setUserStatus(data));
};
export const updateUserStatusTC = (status: string) => async (dispatch: Dispatch<RootActionTypes>) => {
  const data = await profileAPI.setStatus(status);
  if (data.resultCode === 0) {
    dispatch(updateUserStatus(status));
  }
};
export const updateUserPhotoTC = (photoFile: File) => async (dispatch: Dispatch<RootActionTypes>) => {
  const data = await profileAPI.setPhoto(photoFile);
  if (data.resultCode === 0) {
    console.log(data)
    dispatch(updateUserPhoto(data.data.photos));
  }
};

//STATE ======================================================================

let initialState = {
  posts: [
    { id: v1(), message: "Hi, how are you?", likes: 15 },
    { id: v1(), message: "Hi, im fine thank you, and you?", likes: 10 },
  ] as Array<PostType>,
  profile: null,
  status: "",
};

//REDUCER ======================================================================
export const profileReducer = (
  state: initialStateProfileType = initialState,
  action: ProfileActionTypes
): initialStateProfileType => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, { id: v1(), message: action.newPost, likes: 0 }],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.postId),
      };
    case SET_USER_PROFILE:
      return { ...state, profile: action.profileValue };
    case SET_USER_STATUS:
      return { ...state, status: action.status };
    case UPDATE_USER_STATUS:
      return { ...state, status: action.status };
    case UPDATE_USER_PHOTO:

      return {...state, profile: {...state.profile!, photos: action.photos}};
    default:
      return state;
  }
};

//TYPES ======================================================================

export type ProfileActionTypes =
  | ReturnType<typeof addPost>
  | ReturnType<typeof setUserProfile>
  | ReturnType<typeof setUserStatus>
  | ReturnType<typeof updateUserStatus>
  | ReturnType<typeof deletePost>
  | ReturnType<typeof updateUserPhoto>;

export type PostType = {
  id: string;
  message: string;
  likes: number;
};
export type initialStateProfileType = {
  posts: PostType[];
  profile: getProfileResponseType;
  status: string;
};

export type photosType = {
    small: string | undefined;
    large: string | undefined;
}
