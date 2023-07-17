import React from "react";
import { NavLink } from "react-router-dom";
import { DialogType } from "redux/dialogs-reducer";

type DialogItemPropsType = {
  dialog: DialogType;
};

export const DialogItem: React.FC<DialogItemPropsType> = (props) => {
  return <NavLink to={"/dialogs/" + props.dialog.id}>{props.dialog.name}</NavLink>;
};
