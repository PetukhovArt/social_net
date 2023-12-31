import React from "react";
import c from "components/Header/Header.module.css";
import logo from "img/logo.png";
import { NavLink } from "react-router-dom";
import { HeaderContainerPropsType } from "components/Header/HeaderContainer";
import { Loader } from "components/common/Loader/Loader";

type HeaderPropsType = HeaderContainerPropsType;

export const Header = (props: HeaderPropsType) => {
  return (
    <div className={c.header}>
      <div className={c.content}>
        <img src={logo} alt="logo" />
        <div className={c.loginBlock}>
          {props.isAuth ? (
            <>
              <div>
                <button onClick={props.logoutUserTC}>Logout</button>
              </div>
              <div className={c.userName}>{props.login}</div>
            </>
          ) : (
            <NavLink className={c.loginLink} to="/login">
              Login
            </NavLink>
          )}
        </div>
      </div>
      <div className={c.loader}>{props.isLoading && <Loader />}</div>
    </div>
  );
};
