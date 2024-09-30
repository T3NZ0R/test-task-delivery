import { ReactNode } from "react";


export const createDataUser = (
  requestType: string,
  cityOrigin: string,
  cityDestination: string,
  date: string,
  createdAt: string,
  edit: ReactNode,
  deleteIcon: ReactNode
) => {
  return {
    requestType,
    cityOrigin,
    cityDestination,
    date,
    createdAt,
    edit,
    deleteIcon,
  };
};
export const createDataAllUser = (
  userEmail: string,
  requestType: string,
  cityOrigin: string,
  cityDestination: string,
  date: string,
  createdAt: string,
) => {
  return {
    userEmail,
    requestType,
    cityOrigin,
    cityDestination,
    date,
    createdAt,
  };
};
