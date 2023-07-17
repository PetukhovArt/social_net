import { applyMiddleware, combineReducers, createStore } from "redux";
import { UsersActionTypes, usersReducer } from "redux/users-reducer";
import { ProfileActionTypes, profileReducer } from "redux/profile-reducer";
import { DialogsActionTypes, dialogsReducer } from "redux/dialogs-reducer";
import { SideBarActionTypes, sidebarReducer } from "redux/sidebar-reducer";
import { AuthActionTypes, authReducer } from "redux/auth-reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import { AppClassActionTypes, appReducer } from "redux/app-reducer";

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type StoreReduxType = typeof store;

export const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sideBar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type RootState = ReturnType<typeof store.getState>;
export type RootActionTypes =
  | UsersActionTypes
  | AuthActionTypes
  | DialogsActionTypes
  | ProfileActionTypes
  | SideBarActionTypes
  | AppClassActionTypes;

// @ts-ignore
window.store = store;
