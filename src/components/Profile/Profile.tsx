import React from "react";
import c from "components/Profile/Profile.module.css";
import { ProfileInfo } from "components/Profile/ProfileInfo/ProfileInfo";
import { MyPostsContainer } from "components/Profile/MyPosts/MyPostsContainer";
import {getProfileResponseType} from 'api/api';

type ProfilePropsType = {
  notOwner: boolean
  profile: getProfileResponseType;
  status: string;
  updateStatusTC: (status: string) => void;
  updateUserPhotoTC: (file: string) => void;
};

export const Profile: React.FC<ProfilePropsType> = (props) => {
  return (
    <div className={c.profile}>
      <ProfileInfo
        notOwner={props.notOwner}
        profile={props.profile} status={props.status}
        updateStatusTC={props.updateStatusTC}
        updateUserPhotoTC={props.updateUserPhotoTC}
      />
      <MyPostsContainer />
    </div>
  );
};
