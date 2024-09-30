import { ReactNode } from "react";


export const createDataUser = (
  typeRequest: string,
  cityOrigin: string,
  cityDestination: string,
  date: string,
  createdAt: string,
  edit: ReactNode,
  deleteIcon: ReactNode
) => {
  return {
    typeRequest,
    cityOrigin,
    cityDestination,
    date,
    createdAt,
    edit,
    deleteIcon,
  };
};
export const createDataAllUser = (
  typeRequest: string,
  cityOrigin: string,
  cityDestination: string,
  date: string,
  createdAt: string,
  edit: ReactNode,
  deleteIcon: ReactNode
) => {
  return {
    typeRequest,
    cityOrigin,
    cityDestination,
    date,
    createdAt,
    edit,
    deleteIcon,
  };
};
