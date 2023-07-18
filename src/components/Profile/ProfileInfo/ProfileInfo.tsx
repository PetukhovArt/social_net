import React, {ChangeEvent} from 'react';
import c from "components/Profile/ProfileInfo/ProfileInfo.module.css";
import { ProfileStatusWithHooks } from "components/Profile/ProfileInfo/ProfileStatus/ProfileStatusWithHooks";
import userAva from '../../../assets/images/userPhoto.png'
import IconButton from '@mui/material/IconButton';
import {getProfileResponseType} from 'api/api';
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

type ProfileInfoPropsType = {
  notOwner: boolean
  profile: getProfileResponseType;
  status: string;
  updateStatusTC: (status: string) => void;
  updateUserPhotoTC: (file: any)=> void
};

export const ProfileInfo = ({ profile, status, updateStatusTC, notOwner,updateUserPhotoTC }: ProfileInfoPropsType) => {
  if (!profile) {
    return <></>;
  }
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      updateUserPhotoTC(e.target.files[0])
    }
  };
  return (
    <div>
      <div className={c.about}>
        <div className={c.avaBlock}>
          <div className={c.ava}><img src={profile.photos.large || userAva} alt="ava" /></div>
          {!notOwner &&
            <label className={c.label}>
            <input style={{ display: "none" }} type="file" onChange={uploadHandler} accept="image/*" />
            <IconButton component="span">
              <AddAPhotoIcon/>
              {/*<img className={c.uploadIcon} src={upload} alt="load"/>*/}
            </IconButton>
          </label>
          }
        </div>

        <div>
          <span>{profile.fullName}</span>
          <ProfileStatusWithHooks status={status} updateStatusTC={updateStatusTC} />
          <ul>
            <li>Обо мне: {profile.aboutMe}</li>
            <li>В поисках работы: {profile.lookingForAJobDescription}</li>
            <li>
              Вебсайты:
              <ul>
                <li>facebook: {profile.contacts.facebook}</li>
                <li>website: {profile.contacts.website}</li>
                <li>vk: {profile.contacts.vk}</li>
                <li>twitter: {profile.contacts.twitter}</li>
                <li>instagram: {profile.contacts.instagram}</li>
                <li>youtube: {profile.contacts.youtube}</li>
                <li>github: {profile.contacts.github}</li>
                <li>mainLink: {profile.contacts.mainLink}</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
