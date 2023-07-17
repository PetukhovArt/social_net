import React from "react";
import c from "components/Profile/Profile.module.css";
import { ProfileInfo } from "components/Profile/ProfileInfo/ProfileInfo";
import { MyPostsContainer } from "components/Profile/MyPosts/MyPostsContainer";
import { getProfileResponseType } from "components/Profile/ProfileContainer";

type ProfilePropsType = {
  profile: getProfileResponseType;
  status: string;
  updateStatusTC: (status: string) => void;
};

export const Profile: React.FC<ProfilePropsType> = (props) => {
  return (
    <div className={c.profile}>
      <ProfileInfo profile={props.profile} status={props.status} updateStatusTC={props.updateStatusTC} />
      <MyPostsContainer />
    </div>
  );
};
