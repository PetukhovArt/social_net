import React from "react";
import c from "components/Profile/Profile.module.css";
import { Profile } from "components/Profile/Profile";
import { AppRootStateType } from "redux/store-redux";
import { connect } from "react-redux";
import {
  getProfileTC,
  getUserStatusTC,
  initialStateProfileType,
  setUserProfile, updateUserPhotoTC,
  updateUserStatusTC,
} from 'redux/profile-reducer';
import { compose } from "redux";
import { useParams } from "react-router-dom";
import withAuthRedirect from "hoc/WithAuthRedirect";
import {getProfileResponseType} from 'api/api';


class ProfileContainer extends React.Component<ProfileContainerPropsType> {

  refreshProfile() {
    let userId = this.props.userId
    if (!userId && this.props.authorizedUserId) {
      userId = this.props.authorizedUserId;
    }
    this.props.getProfileTC(userId);
    this.props.getUserStatusTC(userId);
  }
  componentDidMount() {
    console.log(this.props.userId)
    this.refreshProfile()
  }
  componentDidUpdate(prevProps : ProfileContainerPropsType) {
    if (this.props.userId != prevProps.userId) {
      this.refreshProfile()
    }
  }

  render() {
    return (
      <div className={c.profile}>
        <Profile
          {...this.props}
          notOwner={!!this.props.userId}
          profile={this.props.profile}
          status={this.props.status}
          updateStatusTC={this.props.updateUserStatusTC}
        />
      </div>
    );
  }
}

export function withRouter(Children: any) {
  return (props: any) => {
    const {userId}=useParams()
    return <Children {...props} userId={userId}/>;
  };
}

const mapStateToProps = (state: AppRootStateType): mapStateToPropsType => {
  return {
    posts: state.profilePage.posts,
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth,
  };
};

export default compose<React.ComponentType>(
  withAuthRedirect,
  withRouter,
  connect(mapStateToProps, {
    setUserProfile,
    getProfileTC,
    getUserStatusTC,
    updateUserStatusTC,
    updateUserPhotoTC
  })
)(ProfileContainer);


//TYPES ====================================================================

type mapDispatchToPropsType = {
  addPost: (postText: string) => void;
  updatePostText: (updateText: string) => void;
  setUserProfile: (profile: getProfileResponseType) => void;
  getProfileTC: (userId: number) => void;
  getUserStatusTC: (userId: number) => void;
  updateUserStatusTC: (status: string) => void;
  updateUserPhotoTC: (file:string)=> void
};
type mapStateToPropsType = initialStateProfileType & {
  authorizedUserId: number | null;
  isAuth: boolean;
};
type ProfileContainerPropsType = mapStateToPropsType & mapDispatchToPropsType
   & {userId: number};

