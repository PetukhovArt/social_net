import React, {Suspense} from 'react';
import "App.css";
import { Navbar } from "components/Navbar/Navbar";
import {Route, Routes} from 'react-router-dom';
import { SideBarContainer } from "components/Navbar/Sidebar/SideBarContainer";
import HeaderContainer from "components/Header/HeaderContainer";
import Login from "components/Login/Login";
import {connect} from 'react-redux';
import { compose } from "redux";
import { initializeAppTC } from "redux/app-reducer";
import {AppRootStateType } from 'redux/store-redux';
import { Loader } from "components/common/Loader/Loader";
import { withRouter } from "components/Profile/ProfileContainer";
import { lazy } from 'react';
import DialogsContainer from 'components/Dialogs/DialogsContainer';
const ProfileContainer = lazy(() => import('components/Profile/ProfileContainer'));
const UsersContainer = lazy(() => import('components/Users/UsersContainer'));
const News = lazy(() => import('components/News/News'))
const Music = lazy(() => import('components/Music/Music'));
const Settings = lazy(() => import('components/Settings/Settings'));

class App extends React.Component<AppPropsType> {
  componentDidMount() {
    this.props.initializeAppTC();
  }
  render() {
    if (!this.props.isInitialized) {
      return <Loader />;
    } else
      return (
        <div className="app-wrapper">
          <HeaderContainer />
          <Navbar />
          <SideBarContainer />
          <div className="app-wrapper-content">
            <Suspense fallback={<></>}>
            <Routes>
              <Route path="/" element={<DialogsContainer />} />
              <Route path="/dialogs/*" element={<DialogsContainer />} />
              <Route path="/profile/:userId?" element={<ProfileContainer />} />
              <Route path="/users/" element={<UsersContainer />} />
              <Route path="/login" element={<Login />} />
              <Route path="/news" element={<News />} />
              <Route path="/music" element={<Music />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
            </Suspense>
          </div>
        </div>
      );
  }
}

const mapStateToProps = (state: AppRootStateType): mapStateToPropsType => {
  return {
    isInitialized: state.app.isInitialized,
  };
};

type AppPropsType = mapDispatchToPropsType & mapStateToPropsType;

type mapDispatchToPropsType = {
  initializeAppTC: () => void;
};
type mapStateToPropsType = {
  isInitialized: boolean;
};

export default compose(withRouter, connect(mapStateToProps, { initializeAppTC }))(App);

