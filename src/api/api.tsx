import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "5e6ef100-8143-4a2b-9ce9-13ce8d825d16",
  },
});

export type FollowUnfollowResType = {
  data: Object;
  messages: string[];
  fieldsErrors: string[];
  resultCode: number;
};

export const usersAPI = {
  getUsers: function (currentPage: number, pageSize: number) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`).then((res) => res.data);
  },
  unFollowFriend: function (userId: number) {
    return instance.delete<FollowUnfollowResType>(`follow/${userId}`).then((res) => res.data);
  },
  followFriend: function (userId: number) {
    return instance.post<FollowUnfollowResType>(`follow/${userId}`).then((res) => res.data);
  },
};
export const authAPI = {
  me: function () {
    return instance.get(`auth/me`).then((res) => res.data);
  },
  login: function (email: string, password: string, rememberMe: boolean) {
    return instance
      .post(`auth/login`, {
        email: email,
        password: password,
        rememberMe: rememberMe,
      })
      .then((res) => res.data);
  },
  logout: function () {
    return instance.delete(`auth/login`).then((res) => res.data);
  },
};

export const profileAPI = {
  getProfile: function (userId: number) {
    return instance
      .get<getProfileResponseType>(`profile/${!userId ? "2" : userId}`)
      .then((res) => res.data);
  },
  getStatus: function (userId: number) {
    return instance.get(`profile/status/${!userId ? "2" : userId}`).then((res) => res.data);
  },
  setStatus: function (status: string) {
    return instance
      .put("profile/status", { status: status })
      .then((res) => res.data);
  },
  setPhoto: function (photoFile: File) {
    let formData= new FormData()
    formData.append('image',photoFile)
    return instance.put<updatePhotoResType>("profile/photo", formData, {
      headers: {'Content-Type': 'multipart/form-data'} // not required (formData generates automatically)
    })
      .then((res) => res.data);
  },
};


//TYPES ===================================================================================================

export type getProfileResponseType = null | {
  aboutMe: string | undefined
  contacts: {
    facebook: string;
    website: string;
    vk: string;
    twitter: string;
    instagram: string;
    youtube: string;
    github: string;
    mainLink: string;
  };
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  userId: number;
  photos: {
    small: string | undefined;
    large: string | undefined;
  };
};

export type updatePhotoResType = {
  resultCode: number
  messages: string[],
  data: {
    photos: {
      small: string | undefined;
      large: string | undefined;
    }
  }
}
